import { Request, Response, NextFunction } from "express";
import { Opinion } from "../models/opinion/opinion";
import createError from "http-errors";
import mongoose from "mongoose";
import { opinionValidator } from "../models/opinion/opinionValidation";
import { isUserPresent } from "../services/user";
import { isDishPresent } from "../services/dish";
import { IUser } from "../models/auth/user/user.types";
import { IDish } from "../models/dish/dish.types";

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

        const existingOpinion = await Opinion.findOne({ user: req.user.userID, dish_id });

        if (existingOpinion) {
            next(createError(400, "User has already added an opinion for this dish"));
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

export const deleteOpinion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { opinion_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(opinion_id)) {
            next(createError(400, "Invalid ID"));
        }
        await Opinion.findByIdAndDelete(opinion_id);
        res.status(200).json({ message: "Opinion deleted successfully." });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getOpinions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { sort } = req.query;
        const sortOption: Record<string, 1 | -1> = {};
        if (sort === "asc" || sort === "desc") {
            sortOption.rating = sort === "asc" ? 1 : -1;
        }

        const opinions = await Opinion.find()
            .populate<{ user: IUser }>("user", "username")
            .populate<{ dish_id: IDish }>("dish_id", "name")
            .sort(sortOption);

        res.status(200).json({
            message: "Successfully get opinions",
            data: opinions.map((opinion) => ({
                opinionID: opinion._id,
                dish_name: opinion.dish_id.name,
                rating: opinion.rating,
                description: opinion.description,
                username: opinion.user ? opinion.user.username : "unknown",
            })),
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getAverageRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { dish_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(dish_id)) {
            next(createError(400, "Invalid ID"));
        }

        const opinions = await Opinion.find({ dish_id });

        const averageRating =
            opinions.length>0 ? opinions.reduce((acc, opinion) => acc + opinion.rating, 0) / opinions.length : 0;

        res.status(200).json({ message: "Successfully get average rating", data: averageRating });
    } catch (error: any) {
        next(createError(500, error.message));
    }
}