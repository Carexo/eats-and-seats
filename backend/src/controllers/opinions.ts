import { Request, Response, NextFunction } from 'express';
import { Opinion } from '../models/opinion/opinion';
import createError from "http-errors";
import mongoose from 'mongoose';
import axios from 'axios';


export const addOpinion = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const {user_id, dish_id, rating, description} = req.body;

        if (!user_id || !dish_id || !rating) {
            next(createError(400, "Please provide all required fields"))
            return;
        }

        if (rating<0 || rating > 5){
            next(createError(400, "Rating must be between 0 and 5"));
            return;
        }

        const opinionatedDish = await axios.get(`http://localhost:3000/api/dishes/${dish_id}`);
        if (!opinionatedDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        const newOpinion = new Opinion({user_id, dish_id, rating, description});
        await newOpinion.save();

        res.status(201).json({message: 'Opinion added successfully.', opinion: newOpinion});
    }
    catch (error: any) {
        next(createError(500, error.message));
    }
}


export const getOpinionsByDishId = async (req: Request, res: Response, next: NextFunction):Promise<void>  => {
    try {
        const { dish_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(dish_id)) {
            next(createError(400, 'Invalid ID'));
        }

        const opinions = await Opinion.find({dish_id});

        res.status(200).json({opinions});
    } catch (error: any) {
        next(createError(500, error.message));
    }
};