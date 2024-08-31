import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class ToggleUserBanDto {

    // @IsNotEmpty()
    // @IsBoolean()
    // isBanned: boolean


    @IsNotEmpty()
    @IsMongoId()
    userId: string

}