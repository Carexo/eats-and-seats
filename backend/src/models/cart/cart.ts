import { Schema, model, Types } from "mongoose";

// interface Product {
//     dishId: Types.ObjectId;
//     quantity: number;
//     name: string;
//     price: number;
// }
//
// export interface CartDocument extends Document {
//     userId: {type: Types.ObjectId, required: true, ref: "user"};
//     products: Product[];
//     active: boolean;
//     modifiedOn: Date;
// }
//
// const CartSchema = new Schema<CartDocument>(
//     {
//         userId: {
//             type: Types.ObjectId,
//             ref: "user",
//             required: true,
//         },
//         products: [
//             {
//                 dishId: { type: Types.ObjectId, ref: "dish", required: true },
//                 quantity: { type: Number, required: true, min: 1 },
//                 name: String,
//                 price: { type: Number, required: true, min: 0 },
//             },
//         ],
//         active: {
//             type: Boolean,
//             default: true,
//         },
//         modifiedOn: {
//             type: Date,
//             default: Date.now,
//         },
//     },
//     { timestamps: true },
// );
//
// export const Cart = model<CartDocument>("Cart", CartSchema);

const CartSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "user",
            required: true,
        },
        products: [
            {
                dishId: { type: Types.ObjectId, ref: "dish", required: true },
                quantity: { type: Number, required: true, min: 1 },
                name: String,
                price: { type: Number, required: true, min: 0 },
            },
        ],
        active: {
            type: Boolean,
            default: true,
        },
        modifiedOn: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

export const Cart = model("Cart", CartSchema);
