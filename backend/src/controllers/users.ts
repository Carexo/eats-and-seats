import {NextFunction, Request, Response} from "express";
import {User} from "../models/auth/user/user";
import createError from "http-errors";

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
}