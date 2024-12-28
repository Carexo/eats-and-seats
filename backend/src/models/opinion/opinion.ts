import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OpinionSchema = new Schema(
    {
        user_id: { type: String, required: true },
        dish_id: { type: String, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: false },
    },
    { timestamps: true },
);

export const Opinion = model("opinion", OpinionSchema);
