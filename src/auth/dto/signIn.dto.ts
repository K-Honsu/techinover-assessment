import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsStrongPassword,
} from 'class-validator';

export class SignInDto {


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
}