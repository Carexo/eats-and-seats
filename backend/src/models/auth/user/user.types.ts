import type { Model } from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface UserJwtPayload {
    userID: string;
    username: string;
}

export interface UserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, UserMethods>;
