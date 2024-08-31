import { IsMongoId, IsNotEmpty } from "class-validator";


export class ToggleUserBanDto {

    @IsNotEmpty()
    @IsMongoId()
    userId: string

}