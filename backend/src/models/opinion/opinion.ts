import { Schema, model, Types } from "mongoose";

interface IOpinion extends Document {
    user: Types.ObjectId;
    dish_id: Types.ObjectId;
    rating: number;
    description?: string;
}

const OpinionSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "user", required: true },
        dish_id: { type: Types.ObjectId, ref: "dish", required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: false },
    },
    { timestamps: true },
);

export const Opinion = model<IOpinion>("opinion", OpinionSchema);
