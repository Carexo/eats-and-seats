import { NextFunction, Request, Response } from "express";
import { User } from "../models/auth/user/user";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { loginUserValidator } from "../models/auth/user/userValidation";
import { newAccessToken, newRefreshToken } from "../utils/auth";
import config from "../config";

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
        const { username } = req.body;
        const { oldPassword, newPassword } = req.body;

        if (!username || !oldPassword || !newPassword) {
            return next(createError(400, "Please provide all fields"));
        }

        if (newPassword.length < 8) {
            return next(createError(400, "New password must be at least 8 characters long"));
        }

        if (!/^(?=.*[!@#$%^&*(),.?":{}|<>])/.test(newPassword)) {
            return next(createError(400, "New password must contain at least one special character"));
        }

        const user = await User.findOne({ username });
        if (!user) {
            return next(createError(404, "User not found."));
        }

        const isPasswordValid = await user.isValidPassword(oldPassword); // Use the model method
        if (!isPasswordValid) {
            return next(createError(400, "Old password is incorrect."));
        }

        user.password = newPassword; // Let the pre-save hook handle hashing
        await user.save();

        const accessToken = newAccessToken(user);

        res.cookie(config.constants.JWT_ACCESS, accessToken, {
            maxAge: config.secrets.accessJwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        const refreshToken = newRefreshToken(user);

        res.cookie(config.constants.JWT_REFRESH, refreshToken, {
            maxAge: config.secrets.refreshJwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        res.status(200).json({
            message: "Password changed successfully.",
            data: { username: user.username, role: user.role },
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
