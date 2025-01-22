import { Request, Response, NextFunction } from "express";
import { dish } from "../models/dish/dish";
import createError from "http-errors";
import mongoose from "mongoose";

export const addDish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, category, price } = req.body;

        if (!name || !price || !req.file) {
            next(createError(400, "Please provide all required fields"));
            return;
        }

        const newDish = new dish({
            name,
            description,
            category,
            price,
            image: req.file.buffer,
            imageType: req.file.mimetype,
        });
        await newDish.save();

        res.status(201).json({ message: "Dish added successfully.", dish: newDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dishes = await dish.find();

        const formattedDishes = dishes.map((dish) => ({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            image: `data:${dish.imageType};base64,${dish.image.toString("base64")}`,
        }));

        res.status(200).json(formattedDishes);
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getDishByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const foundDish = await dish.findOne({ name });

        if (!foundDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({
            id: foundDish._id,
            name: foundDish.name,
            description: foundDish.description,
            price: foundDish.price,
            category: foundDish.category,
            image: `data:${foundDish.imageType};base64,${foundDish.image.toString("base64")}`, // Zdjęcie w Base64
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getDishById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid ID"));
            return;
        }

        const foundDish = await dish.findById(id);

        if (!foundDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({
            id: foundDish._id,
            name: foundDish.name,
            description: foundDish.description,
            price: foundDish.price,
            category: foundDish.category,
            image: `data:${foundDish.imageType};base64,${foundDish.image.toString("base64")}`, // Zdjęcie w Base64
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const updateDishById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid ID"));
            return;
        }

        const updates = req.body;
        if (req.file) {
            updates.image = req.file.buffer;
            updates.imageType = req.file.mimetype;
        }

        const updatedDish = await dish.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({ message: "Dish updated successfully.", dish: updatedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const updateDishByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.image = req.file.buffer;
            updates.imageType = req.file.mimetype;
        }

        const updatedDish = await dish.findOneAndUpdate({ name }, updates, { new: true });

        if (!updatedDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({ message: "Dish updated successfully.", dish: updatedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const deleteDishById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid ID"));
            return;
        }

        const deletedDish = await dish.findByIdAndDelete(id);

        if (!deletedDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({ message: "Dish deleted successfully.", dish: deletedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const deleteDishByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;

        const deletedDish = await dish.findOneAndDelete({ name });

        if (!deletedDish) {
            next(createError(404, "Dish not found"));
            return;
        }

        res.status(200).json({ message: "Dish deleted successfully.", dish: deletedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Request received for categories");
        const categories = await dish.distinct("category");
        console.log("Fetched categories:", categories);

        res.status(200).json(categories);
    } catch (error: any) {
        console.error("Error in getCategories:", error.message);
        next(createError(400, error.message));
    }
};

export const getFilteredDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, minPrice, maxPrice, searchTerm, sortBy, page = 1, limit = 10 } = req.query;

        const filter: any = {};
        if (category) {
            filter.category = category;
        }
        if (minPrice) {
            filter.price = { $gte: Number(minPrice) };
        }
        if (maxPrice) {
            filter.price = { ...filter.price, $lte: Number(maxPrice) };
        }
        if (searchTerm) {
            filter.name = { $regex: searchTerm, $options: "i" };
        }

        const sort: any = {};
        if (sortBy) {
            sort.price = sortBy === "asc" ? 1 : -1;
        }

        const skip = (Number(page) - 1) * Number(limit);
        const dishes = await dish.find(filter).sort(sort).skip(skip).limit(Number(limit));

        const total = await dish.countDocuments(filter);

        const formattedDishes = dishes.map((dish) => ({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            image: `data:${dish.imageType};base64,${dish.image.toString("base64")}`,
        }));

        res.status(200).json({ dishes: formattedDishes, total });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};