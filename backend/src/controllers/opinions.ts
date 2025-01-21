import { Request, Response, NextFunction } from "express";
import { Opinion } from "../models/opinion/opinion";
import createError from "http-errors";
import mongoose from "mongoose";
import { opinionValidator } from "../models/opinion/opinionValidation";
import { isUserPresent } from "../services/user";
import { isDishPresent } from "../services/dish";
import { IUser } from "../models/auth/user/user.types";

export const addOpinion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { dish_id, rating, description } = req.body;

    const { error } = opinionValidator.validate({ dish_id, rating });

    if (error) {
        next(createError(400, error.message));
        return;
    }

    if (!req?.user || !req.user?.userID) {
        next(createError(400, "User is not logged in"));
        return;
    }

    try {
        const isUser = await isUserPresent(req.user.userID);

        if (!isUser) {
            next(createError(404, "User not found"));
        }

        const isDish = await isDishPresent(dish_id);

        if (!isDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        const newOpinion = new Opinion({ user: req.user.userID, dish_id, rating, description });
        await newOpinion.save();

        res.status(201).json({ message: "Opinion added successfully.", opinion: newOpinion });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getOpinionsByDishId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { dish_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(dish_id)) {
            next(createError(400, "Invalid ID"));
        }

        const opinions = await Opinion.find({ dish_id }).populate<{ user: IUser }>("user");

        res.status(200).json({
            message: "Successfully get opinions",
            data: opinions.map((opinion) => ({
                opinionID: opinion._id,
                rating: opinion.rating,
                description: opinion.description,
                username: opinion?.user?.username,
            })),
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
