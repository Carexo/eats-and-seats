import {model, Schema, Types} from "mongoose";
import {AddressSchema, IAddress} from "../address/address";

// Define the structure of an order item
export interface IOrderItem {
    dishId: Types.ObjectId;
    quantity: number;
}

// Define the Order document interface
export interface IOrder extends Document {
    user?: Types.ObjectId
    email?: string;
    address: IAddress;
    products: IOrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
    orderDate: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
    user: {
        type: Types.ObjectId,
        ref: 'user',
    },
    email: {
        type: String,
        required: function () {
            return this.user === null;
        },
        validate: {
            validator: function (v: string): boolean {
                return this.user ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format.',
        },
    },
    address: {
        type: AddressSchema,
        required: true,
    },
    products: [
        {
            dishId: {
                type: Types.ObjectId,
                ref: 'dish',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save validation to ensure correct data based on user type
OrderSchema.pre<IOrder>('save', function (next) {
    if (!this.user && !this.email) {
        next(new Error('Guest orders must include an email.'));
    } else if (this.user && this.email) {
        this.email = undefined;
    }
    next();
});

export const Order = model<IOrder>("order", OrderSchema);