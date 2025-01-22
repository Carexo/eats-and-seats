import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DishSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: false,
            index: true,
        },
        price: {
            type: Number,
            required: true,
            index: true,
        },
        image: {
            type: Buffer,
            required: true,
        },
        imageType: {
            type: String,
            required: true,
        },
    },
    { timestamps: false },
);

export const dish = model("dish", DishSchema);
