import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsStrongPassword,
    IsEnum,
    IsOptional,
} from 'class-validator';
import { Name } from 'src/users/schemas/name.schema';
import { Role } from 'src/users/schemas/user.schema';

export class SignUpDto {

    @Transform(({ value }) => {
        const [first = '', last = ''] = value.split(' ').map((v: string) => v.trim());
        return { first, last };
    }, { toClassOnly: true })
    @IsNotEmpty()
    name: Name;

    @Transform(
        (params) => {
            const value: string = params.value;
            return value.trim().toLowerCase();
        },
        { toClassOnly: true },
    )
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: string;
}