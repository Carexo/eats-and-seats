import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { getDishByIDWithoutImage } from "../services/dish";
import { cartValidation } from "../models/cart/cartValidation";
import { addDish, getCartByUserID, getCartByUserIdView, removeDish, updateDish } from "../services/cart";

export const addDishToCart = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;
    const quantity = req.body.quantity;

    const { error } = cartValidation.validate({ dishId, quantity });

    if (error) {
        next(createError(400, error.message));
        return;
    }

    try {
        const dish = await getDishByIDWithoutImage(dishId);

        if (!req?.user?.userID) {
            next(createError(400, "User is not logged in"));
            return;
        }

        await addDish(req.user.userID, dish, quantity);

        res.status(201).json({ message: "Dish added to cart" });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user?.userID) {
        next(createError(400, "User is not logged in"));
        return;
    }

    try {
        const cartView = await getCartByUserIdView(req.user.userID);

        res.json({ message: "Successfully get cart", data: cartView });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const removeDishFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    if (!dishId) {
        next(createError(400, "Dish ID is required"));
        return;
    }

    if (!req?.user?.userID) {
        next(createError(400, "User is not logged in"));
        return;
    }

    try {
        await removeDish(req.user.userID, dishId);

        res.json({ message: "Dish removed from cart" });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const updateDishQuantity = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;
    const quantity = req.body.quantity;

    const { error } = cartValidation.validate({ dishId, quantity });

    if (error) {
        next(createError(400, error.message));
        return;
    }

    if (!req?.user?.userID) {
        next(createError(400, "User is not logged in"));
        return;
    }

    try {
        await updateDish(req.user.userID, dishId, quantity);

        res.json({ message: "Dish quantity updated" });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
