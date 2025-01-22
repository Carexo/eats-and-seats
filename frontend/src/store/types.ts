import {
  NotificationMessage,
  NotificationTypes,
} from './notification/state.types.ts';

import { UserPayload } from './auth/state.types.ts';
import { CartState, Product } from './cart/state.types.ts';
import { CartPayload } from '../api/queries/cart.ts';

export type ActionsContextType = {
  loginUser: (user: UserPayload) => void;
  logoutUser: () => void;
  notificationSend: (
    type: NotificationTypes,
    message: NotificationMessage,
  ) => void;
  addProduct: (product: Product) => void;
  removeProduct: (dishId: string) => void;
  changeCart: (cart: CartState) => void;
  updateProduct: (cartPayload: CartPayload) => void;
  getCart: () => void;
};
