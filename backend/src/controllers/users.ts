import { NextFunction, Request, Response } from "express";
import { User } from "../models/auth/user/user";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { loginUserValidator } from "../models/auth/user/userValidation";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!username || !oldPassword || !newPassword) {
            return next(createError(400, "Please provide all fields"));
        }

        const user = await User.findOne({ username });
        if (!user) {
            return next(createError(404, "User not found."));
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return next(createError(400, "Old password is incorrect."));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
