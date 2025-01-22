import { dish } from "../models/dish/dish";
import { Types } from "mongoose";

export const getDishByID = async (dishID: string) => {
    try {
        const foundDish = await dish.findById(dishID);
        if (!foundDish) {
            throw new Error("Dish not found");
        }
        return foundDish;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getDishByIDWithoutImage = async (dishID: string) => {
    try {
        const foundDish = await dish.findById(dishID).select("-image -imageType");
        if (!foundDish) {
            throw new Error("Dish not found");
        }
        return foundDish;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const isDishPresent = async (dishID: string) => {
    try {
        await getDishByID(dishID);
        return true;
    } catch (error: any) {
        return false;
    }
};

export const getDishes = async (dishIds: Types.ObjectId[]) => {
    try {
        const dishes = await dish.find({ _id: { $in: dishIds } });

        return dishes;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
