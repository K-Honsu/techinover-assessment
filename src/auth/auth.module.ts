import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get("jwt")
        return {
          secret: jwtConfig.secret,
          signOptions: {
            issuer: jwtConfig.issuer,
            expiresIn: jwtConfig.expiresIn,
          },
          verifyOptions: {
            issuer: jwtConfig.issuer,
          },
        }
      }
    }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
