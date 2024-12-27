import type { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500,
        },
    });
};
