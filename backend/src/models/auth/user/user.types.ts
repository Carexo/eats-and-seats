import type { Model } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface UserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, UserMethods>;
