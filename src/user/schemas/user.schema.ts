import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop()
    password: string;
    
    @Prop()
    email: string;

    @Prop()
    refresh_token: string;

    @Prop()
    role: string[];

    @Prop()
    age: number;

    @Prop()
    gender: number;

    @Prop({ type: Object })
    company: {
        _id: mongoose.Schema.Types.ObjectId,
        name: string,
    }

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string,
    };
    @Prop({ required: true, default: true })
    isActived: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    deletedAt: Date;

    @Prop()
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);