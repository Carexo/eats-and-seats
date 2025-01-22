import multer from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

const storage = multer.memoryStorage();

export const uploadImage = multer({ storage });

export const optimizeImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    try {
        req.file.buffer = await sharp(req.file.buffer)
            .toFormat("webp", { quality: 80 }) // Konwersja do WebP i kompresja
            .resize({ width: 800 }) // Maksymalna szerokość obrazu
            .toBuffer();

        req.file.mimetype = "image/webp"; // Zmień typ MIME na WebP
        next();
    } catch (error) {
        next(createError(500, "Failed to process image"));
    }
};
