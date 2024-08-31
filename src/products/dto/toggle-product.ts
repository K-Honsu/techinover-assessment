import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ProductStatus } from "../schemas/product.schema";

export class ToggleProductStatusDto {

    @IsMongoId()
    @IsNotEmpty()
    productId: string


    @IsNotEmpty()
    @IsEnum(ProductStatus, { message: "status must either be 'approved' or 'disapproved' " })
    isApproved: string
}