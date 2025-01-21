import { dish } from "../models/dish/dish";

export const getDishByID = async (dishID: string) => {
    try {
        const foundDish = await dish.findById(dishID);
        if (!foundDish) {
            throw new Error("Dish not found");
        }
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
