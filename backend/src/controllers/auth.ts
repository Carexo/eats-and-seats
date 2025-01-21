import type { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/auth";
import createError from "http-errors";
import config from "../config";
import { newAccessToken, newRefreshToken, verifyToken } from "../utils/auth";
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

        res.status(201).json({
            message: `User ${user.username} was successfully login`,
            data: { username: user.username },
        });
    } catch (error: any) {
        next(createError(400, error.message));
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies[config.constants.JWT_ACCESS];
    const refreshToken = req.cookies[config.constants.JWT_REFRESH];

    if (!accessToken) {
        next(createError(400, "Token was not provided"));
        return;
    }

    try {
        const checkIfAccessTokenBlacklisted = await BlackList.findOne({ token: accessToken });

        if (refreshToken) {
            const checkIfRefreshTokenBlacklisted = await BlackList.findOne({ token: refreshToken });

            if (!checkIfRefreshTokenBlacklisted) {
                const newRefreshTokenBlacklist = new BlackList({ token: refreshToken });

                await newRefreshTokenBlacklist.save();
            }
        }

        if (checkIfAccessTokenBlacklisted) {
            next(createError(401, "Token is expired"));
            return;
        }

        const newAccessTokenBlacklist = new BlackList({ token: accessToken });

        await newAccessTokenBlacklist.save();

        res.setHeader("Clear-Site-Data", '"cookies"');
        res.status(200).json({ message: "You are logged out!" });
    } catch (err) {
        next(createError(500, "Internal Server Error"));
    }

    res.end();
};

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies[config.constants.JWT_REFRESH];
    const accessToken = req.cookies[config.constants.JWT_ACCESS];

    try {
        await verifyToken(accessToken);
        const checkIfBlacklisted = await BlackList.findOne({ token: accessToken });

        if (!checkIfBlacklisted) {
            const newBlacklist = new BlackList({
                token: accessToken,
            });

            await newBlacklist.save();
        }
    } catch (err) {}

    if (!refreshToken) {
        next(createError(400, "Token was not provided"));
        return;
    }

    try {
        const checkIfBlacklisted = await BlackList.findOne({ token: refreshToken });

        if (checkIfBlacklisted) {
            next(createError(400, "Token is expired"));
            return;
        }

        const newBlacklist = new BlackList({
            token: refreshToken,
        });

        await newBlacklist.save();

        const decoded = await verifyToken(refreshToken);

        const accessToken = newAccessToken({ _id: decoded.user.userID, username: decoded.user.username });

        res.cookie(config.constants.JWT_ACCESS, accessToken, {
            maxAge: config.secrets.accessJwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        const refreshTokenNew = newRefreshToken({ _id: decoded.user.userID, username: decoded.user.username });

        res.cookie(config.constants.JWT_REFRESH, refreshTokenNew, {
            maxAge: config.secrets.refreshJwtExp * 1000,
            httpOnly: true,
            secure: config.production,
        });

        res.status(200).json({ message: "Successfully refresh token" });
    } catch (err) {
        next(createError(500, "Internal Server Error"));
    }
};

export const checkStatus = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies[config.constants.JWT_ACCESS];

    if (!accessToken) {
        next(createError(401, "Token was not provided"));
        return;
    }

    try {
        const decoded = await verifyToken(accessToken);

        res.status(200).json({ message: "You are logged in", data: { username: decoded.user.username } });
    } catch (err) {
        next(createError(401, "Token is invalid"));
    }
};
