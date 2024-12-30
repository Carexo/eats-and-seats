import type { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/auth";
import createError from "http-errors";
import config from "../config";
import { newToken } from "../utils/auth";
import BlackList from "../models/auth/blackList";
import { loginUserValidator, registerUserValidator } from "../models/auth/user/userValidation";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const { error } = registerUserValidator.validate({ username, email, password });

    if (error) {
        next(createError(400, error.message));
        return;
    }

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

        res.status(201).json({
            message: `User ${user.username} was successfully created`,
            data: { username: user.username },
        });
    } catch (error: any) {
        next(createError(400, error.message));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { error } = loginUserValidator.validate({ email, password });

    if (error) {
        next(createError(400, error.message));
        return;
    }

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

        res.status(201).json({
            message: `User ${user.username} was successfully login`,
            data: { username: user.username },
        });
    } catch (error: any) {
        next(createError(400, error.message));
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt_auth;

    if (!token) {
        next(createError(401, "Token was not provided"));
        return;
    }

    try {
        const checkIfBlacklisted = await BlackList.findOne({ token: token });

        if (checkIfBlacklisted) {
            next(createError(400, "Token is expired"));
            return;
        }

        const newBlacklist = new BlackList({
            token: token,
        });

        await newBlacklist.save();

        res.setHeader("Clear-Site-Data", '"cookies"');
        res.status(200).json({ message: "You are logged out!" });
    } catch (err) {
        next(createError(500, "Internal Server Error"));
    }

    res.end();
};
