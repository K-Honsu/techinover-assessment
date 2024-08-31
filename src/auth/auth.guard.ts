import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

export type PopulatedRequest = Request & { user: { id: string, role: string } };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<PopulatedRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not present!');
        }

        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('Invalid token!');
        }

        const user = await this.usersService.getUserOrThrow(payload.sub);

        if (user.isBanned) {
            throw new ForbiddenException(
                'Account has been banned due to breach of security policy. Kindly contact support if you feel this was a mistake. Thank you.',
            );
        }

        request.user = { id: payload.sub, role: user.role };

        const requiredRoles = this.getRequiredRoles(context);
        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource.');
        }

        return true;
    }

    private extractTokenFromHeader(ctx: Request): string | undefined {
        const [type, token] = ctx.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private getRequiredRoles(context: ExecutionContext): string[] {
        const handler = context.getHandler();
        const roles = Reflect.getMetadata('roles', handler) as string[] || [];
        return roles;
    }
}