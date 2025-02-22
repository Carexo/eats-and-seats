import { Cart, CartDocument } from "../models/cart/cart";
import { IDish } from "../models/dish/dish";

export const getCartByUserID = (userId: string) => {
    return Cart.findOne({ userId, active: true });
};

const getCartView = (cart: CartDocument) => {
    return {
        products: cart.products,
        total: cart.total,
    };
};

export const addDish = async (userId: string, dish: IDish, quantity: number) => {
    const cart = await getCartByUserID(userId);

    if (!cart) {
        const newCart = new Cart({
            userId: userId,
            products: [{ dishId: dish._id, quantity, name: dish.name, price: dish.price }],
            total: dish.price * quantity,
        });

        await newCart.save();
        return getCartView(newCart);
    } else {
        const productIndex = cart.products.findIndex((product) => dish._id.toString() === product.dishId.toString());

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ dishId: dish._id, quantity, name: dish.name, price: dish.price });
        }

        cart.total = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

        await cart.save();

        return getCartView(cart);
    }
};

export const removeDish = async (userId: string, dishId: string) => {
    const cart = await getCartByUserID(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    const productIndex = cart.products.findIndex((product) => dishId === product.dishId.toString());

    if (productIndex === -1) {
        throw new Error("Dish not found in cart");
    }

    cart.products.splice(productIndex, 1);

    cart.total = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    await cart.save();
    return getCartView(cart);
};

export const updateDish = async (userId: string, dishId: string, quantity: number) => {
    const cart = await getCartByUserID(userId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    const productIndex = cart.products.findIndex((product) => dishId === product.dishId.toString());

    if (productIndex === -1) {
        throw new Error("Dish not found in cart");
    }

    cart.products[productIndex].quantity = quantity;

    cart.total = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    await cart.save();

    return getCartView(cart);
};

export const getCartByUserIdView = async (userId: string) => {
    const cart = await getCartByUserID(userId);
    if (!cart) {
        return { products: [], total: 0 };
    } else {
        return getCartView(cart);
    }
};
