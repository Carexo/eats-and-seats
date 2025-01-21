import { Schema, model, Types } from "mongoose";

export interface IDish extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    category?: string;
    price: number;
    image: Buffer;
    imageType: string;
    type: string;
}

const DishSchema = new Schema<IDish>(
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

export const dish = model<IDish>("dish", DishSchema);
