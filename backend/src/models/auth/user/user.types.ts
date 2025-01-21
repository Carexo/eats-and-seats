import type { Model } from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin";
}

export interface UserJwtPayload {
    userID: string;
    username: string;
    role: "user" | "admin";
}

export interface UserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, UserMethods>;
