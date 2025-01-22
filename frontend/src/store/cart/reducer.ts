import { CartActions } from './actions.ts';
import { CartState } from './state.types.ts';

export const cartReducer = (state: CartState, action: CartActions) => {
  if (action.type === 'cart/add') {
    const existingProductIndex = state.products.findIndex(
      (product) => product.dishId === action.payload.dishId,
    );

    let newState;

    if (existingProductIndex !== -1) {
      const updatedProducts = state.products.map((product, index) =>
        index === existingProductIndex
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );
      newState = {
        ...state,
        products: updatedProducts,
        total: state.total + action.payload.price,
      };
    } else {
      newState = {
        ...state,
        products: [...state.products, action.payload],
        total: state.total + action.payload.price,
      };
    }

    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }

  if (action.type === 'cart/remove') {
    const updatedProducts = state.products.filter(
      (product) => product.dishId !== action.payload.dishId,
    );
    const removedProduct = state.products.find(
      (product) => product.dishId === action.payload.dishId,
    );
    const newState = {
      ...state,
      products: updatedProducts,
      total:
        state.total -
        (removedProduct ? removedProduct.price * removedProduct.quantity : 0),
    };

    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }

  if (action.type === 'cart/update') {
    const updatedProducts = state.products.map((product) =>
      product.dishId === action.payload.dishId
        ? { ...product, quantity: action.payload.quantity }
        : product,
    );

    const updatedProduct = state.products.find(
      (product) => product.dishId === action.payload.dishId,
    );

    const newState = {
      ...state,
      products: updatedProducts,
      total:
        state.total +
        (updatedProduct
          ? (action.payload.quantity - updatedProduct.quantity) *
            updatedProduct.price
          : 0),
    };

    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }

  if (action.type === 'cart/change') {
    return action.payload.cart;
  }

  if (action.type === 'cart/get') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : state;
  }

  return state;
};
