import mongoose from "mongoose";
import { IUser, UserModel } from "./user.types";
import { hash, compare } from "bcrypt";

const userSchema = new mongoose.Schema<IUser, UserModel>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
    this.password = await hash(this.password, 10);

    next();
});

userSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
    return await compare(password, this.password);
});

export const User = mongoose.model<IUser, UserModel>("user", userSchema);
