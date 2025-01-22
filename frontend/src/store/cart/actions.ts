import { CartState, Product } from './state.types.ts';
import { CartPayload } from '../../api/queries/cart.ts';

export const cartActions = {
  addProduct: (product: Product) => ({
    type: 'cart/add' as const,
    payload: product,
  }),

  removeProduct: (dishId: string) => ({
    type: 'cart/remove' as const,
    payload: { dishId },
  }),

  changeCart: (cart: CartState) => ({
    type: 'cart/change' as const,
    payload: { cart },
  }),

  updateProduct: (cartPayload: CartPayload) => ({
    type: 'cart/update' as const,
    payload: cartPayload,
  }),

  getCart: () => ({
    type: 'cart/get' as const,
  }),
};

export type CartActions =
  | ReturnType<typeof cartActions.addProduct>
  | ReturnType<typeof cartActions.removeProduct>
  | ReturnType<typeof cartActions.changeCart>
  | ReturnType<typeof cartActions.updateProduct>
  | ReturnType<typeof cartActions.getCart>;
