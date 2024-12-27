import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { verifyToken } from "../utils/auth";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt_auth;

    if (!token) {
        next(createError(401, "Token was not provided"));
        return;
    }

    try {
        const decoded = await verifyToken(token);

        req.userEmail = decoded.userEmail;

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
