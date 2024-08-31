import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

export enum ProductStatus {
    APPROVED = "approved",
    DISAPPROVED = "disapproved"
}

@Schema({ timestamps: true })
export class Product {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
    userId: MongooseSchema.Types.ObjectId

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: Number, required: true })
    quantity: number

    @Prop({ type: String, enum: ProductStatus, default: ProductStatus.DISAPPROVED })
    isApproved: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);