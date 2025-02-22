import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { verifyToken } from "../utils/auth";
import BlackList from "../models/auth/blackList";
import config from "../config";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[config.constants.JWT_ACCESS];

    if (!token) {
        next(createError(401, "Token was not provided"));
        return;
    }

    try {
        const checkIfBlacklisted = await BlackList.findOne({ token: token }); // Check if that token is blacklisted

        if (checkIfBlacklisted) {
            next(createError(401, "This session has expired. Please login"));
            return;
        }

        const decoded = await verifyToken(token);

        req.user = decoded.user;

        next();
    } catch (error) {
        next(createError(401, "Invalid token"));
    }
};

export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
    await protect(req, res, async (err: any) => {
        if (err) {
            next(err);
            return;
        }

        if (req?.user?.role !== "admin") {
            next(createError(403, "You are not authorized to access this route"));
            return;
        }

        next();
    });
};

export const optionalProtect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[config.constants.JWT_ACCESS];

    if (!token) {
        next();
        return;
    }

    await protect(req, res, next);
};
