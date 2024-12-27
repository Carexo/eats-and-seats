import { Request, Response, NextFunction } from 'express';
import { Dish } from '../models/dish/dish';
import createError from "http-errors";
import mongoose from 'mongoose';


export const addDish = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const {name, description, category, price} = req.body;
        
        if (!name || !price || !req.file) {
            next(createError(400, "Please provide all required fields"))
            return;
        }
        
        const newDish = new Dish({name, description, category, price, image: req.file.buffer, imageType: req.file.mimetype,});
        await newDish.save();
        
        res.status(201).json({message: 'Dish added successfully.', dish: newDish});
    }
    catch (error: any) {
        next(createError(500, error.message));
    }
}

export const getDishes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const dishes = await Dish.find();

        const formattedDishes = dishes.map((dish) => ({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            image: `data:${dish.imageType};base64,${dish.image.toString('base64')}`,
        }));

        res.status(200).json(formattedDishes);
    } catch (error:any) {
        next(createError(500, error.message));
    }
};

export const getDishByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.params;
        const dish = await Dish.findOne({ name });

        if (!dish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            image: `data:${dish.imageType};base64,${dish.image.toString('base64')}`, // Zdjęcie w Base64
        });
    } catch (error:any) {
        next(createError(500, error.message));
    }
};

export const getDishById = async (req: Request, res: Response, next: NextFunction):Promise<void>  => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, 'Invalid ID'));
        }

        const dish = await Dish.findById(id);

        if (!dish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({
            id: dish._id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            image: `data:${dish.imageType};base64,${dish.image.toString('base64')}`, // Zdjęcie w Base64
        });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};


export const updateDishById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, 'Invalid ID'));
            return;
        }

        const updates = req.body;
        if (req.file) {
            updates.image = req.file.buffer;
            updates.imageType = req.file.mimetype;
        }

        const updatedDish = await Dish.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedDish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({ message: 'Dish updated successfully.', dish: updatedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const updateDishByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.image = req.file.buffer;
            updates.imageType = req.file.mimetype;
        }

        const updatedDish = await Dish.findOneAndUpdate({ name }, updates, { new: true });

        if (!updatedDish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({ message: 'Dish updated successfully.', dish: updatedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const deleteDishById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, 'Invalid ID'));
            return;
        }

        const deletedDish = await Dish.findByIdAndDelete(id);

        if (!deletedDish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({ message: 'Dish deleted successfully.', dish: deletedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const deleteDishByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.params;

        const deletedDish = await Dish.findOneAndDelete({ name });

        if (!deletedDish) {
            next(createError(404, 'Dish not found'));
            return;
        }

        res.status(200).json({ message: 'Dish deleted successfully.', dish: deletedDish });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
