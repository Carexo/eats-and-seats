import { NextFunction, Request, Response } from "express";
import { Order, IOrder, IOrderItem } from "../models/order/order";
import createError from "http-errors";
import { orderValidator } from "../models/order/orderValidation";
import { getDishes } from "../services/dish";
import { getCartByUserID } from "../services/cart";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userID || null;

        const { total, address, email } = req.body;
        const products: IOrderItem[] = req.body?.products;

        if (userId) {
            const { error } = orderValidator.validate({ user: userId, email, address, total, products });

            if (error) {
                next(createError(400, error.message));
                return;
            }
        } else {
            const { error } = orderValidator.validate({ email, address, total, products });

            if (error) {
                next(createError(400, error.message));
                return;
            }
        }

        let newOrder: IOrder;

        if (userId) {
            const cart = await getCartByUserID(userId);

            if (!cart || cart.products.length === 0) {
                res.status(400).json({ message: "Your cart is empty." });
                return;
            }

            newOrder = await new Order({
                user: userId,
                address,
                products: cart.products,
                total: cart.total,
                status: "pending",
            }).save();

            cart.active = false;
            await cart.save();
        } else {
            let total = 0;

            const dishIds = products.map((item) => item.dishId);

            const dishes = await getDishes(dishIds);

            const mappedProducts = dishes.map((item) => {
                const product = products.find((p) => p.dishId.toString() === item.id.toString());
                if (!product) {
                    return;
                }
                total += item.price * product.quantity;
                return { dishId: item.id, quantity: product.quantity, price: item.price };
            });

            newOrder = await new Order({
                email,
                address,
                products: mappedProducts,
                total: total,
                status: "pending",
            }).save();
        }

        res.status(201).json({ message: "Order created successfully.", data: newOrder });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userID;

        if (!userId) {
            next(createError(401, "Unauthorized. Please log in."));
            return;
        }

        const orders = await Order.find({ user: userId }).populate({
            path: "products.dishId",
            select: "-image",
        });

        res.status(200).json(orders);
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getUserOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userID;
        const { id } = req.params;

        const order = await Order.findById(id).populate({
            path: "products.dishId",
            select: "-image",
        });

        if (!order) {
            next(createError(404, "Order not found."));
            return;
        }

        if (order.user && order.user.toString() !== userId) {
            next(createError(403, "You are not authorized to cancel this order."));
            return;
        }

        res.status(200).json({ message: "Successfully get order", data: order });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id).populate({
            path: "products.dishId",
            select: "-image",
        });

        if (!order) {
            next(createError(404, "Order not found."));
            return;
        }

        res.status(200).json({ message: "Successfully get order", data: order });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);
        if (!order) {
            next(createError(404, "Order not found."));
            return;
        }

        if (order.user && order.user.toString() !== req.user?.userID) {
            next(createError(403, "You are not authorized to cancel this order."));
            return;
        }

        if (order.status !== "pending") {
            next(createError(400, "Only pending orders can be canceled."));
        }

        order.status = "canceled";
        await order.save();

        res.status(200).json({ message: "Order canceled successfully.", order });
    } catch (error: any) {
        next(createError(500, error.message));
    }
};
