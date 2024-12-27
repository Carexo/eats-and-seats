import type { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/auth";
import createError from "http-errors";
import config from "../config";
import { newToken } from "../utils/auth";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        next(createError(400, "Please provide all fields"));
        return;
    }

    try {
        const user = await createUser({ username, email, password });

        const token = newToken(user);

        res.cookie("jwt_auth", token, {
            maxAge: config.secrets.jwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        res.status(201).json({ message: `User ${user.username} was successfully created` });
    } catch (error: any) {
        next(createError(400, error.message));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(createError(400, "Please provide all fields"));
        return;
    }

    try {
        const user = await loginUser(email, password);

        const token = newToken(user);

        res.cookie("jwt_auth", token, {
            maxAge: config.secrets.jwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        res.status(201).json({ message: `User ${user.username} was successfully login` });
    } catch (error: any) {
        next(createError(400, error.message));
    }
};
