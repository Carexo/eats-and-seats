import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const DishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
    imageType: {
        type: String,
        required: true,
    }
}, { timestamps: false });

export const Dish = model('Dish', DishSchema);