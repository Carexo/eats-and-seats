import React, { useMemo, useReducer } from 'react';
import { ActionsContext, AuthContext, CartContext } from './index.ts';
import { authReducer } from './auth/reducer.ts';
import { authActions } from './auth/actions.ts';
import { notification } from 'antd';
import { notificationReducer } from './notification/reducer.ts';
import { notificationActions } from './notification/actions.ts';
import {
  NotificationMessage,
  NotificationTypes,
} from './notification/state.types.ts';
import { AuthState, UserPayload } from './auth/state.types.ts';
import { cartReducer } from './cart/reducer.ts';
import { CartState, Product } from './cart/state.types.ts';
import { cartActions } from './cart/actions.ts';
import { CartPayload } from '../api/queries/cart.ts';

const initialAuthState: AuthState = {
  isLogged: false,
  username: '',
  role: 'guest',
};

const initialCartState: CartState = {
  products: [],
  total: 0,
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification({
    placement: 'bottomLeft',
  });

  const reducerNotification = useReducer(notificationReducer, {
    notification: api,
  });
  const notificationDispatch = reducerNotification[1];

  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);

  const actions = useMemo(
    () => ({
      loginUser: (user: UserPayload) =>
        authDispatch(authActions.loginUser(user)),
      logoutUser: () => authDispatch(authActions.logoutUser()),
      notificationSend: (
        type: NotificationTypes,
        message: NotificationMessage,
      ) => notificationDispatch(notificationActions.send(type, message)),
      addProduct: (product: Product) =>
        cartDispatch(cartActions.addProduct(product)),
      removeProduct: (dishId: string) =>
        cartDispatch(cartActions.removeProduct(dishId)),
      changeCart: (cart: CartState) =>
        cartDispatch(cartActions.changeCart(cart)),
      updateProduct: (cartPayload: CartPayload) =>
        cartDispatch(cartActions.updateProduct(cartPayload)),
      getCart: () => cartDispatch(cartActions.getCart()),
    }),
    [authDispatch, notificationDispatch],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <AuthContext.Provider value={auth}>
        <CartContext.Provider value={cart}>
          {contextHolder}
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </ActionsContext.Provider>
  );
};

export default Provider;
