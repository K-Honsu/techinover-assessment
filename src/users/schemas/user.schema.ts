import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Name } from './name.schema';
import { isEmail } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {

    @Prop({ type: Name, required: true, default: () => ({}) })
    name: Name;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value: string) => isEmail(value),
            message: 'Invalid email format',
        },
    })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role?: Role

    @Prop({ type: Boolean, default: false })
    isBanned: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);