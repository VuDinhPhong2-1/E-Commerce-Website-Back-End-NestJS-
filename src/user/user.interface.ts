import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: {
        _id: string,
        name: string,
    },
}
