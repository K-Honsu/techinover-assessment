import { Prop } from '@nestjs/mongoose';

export class Name {
    @Prop({ type: String, trim: true })
    first: string;

    @Prop({ type: String, trim: true })
    last: string;
}