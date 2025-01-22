import { createContext } from 'react';
import { AuthState } from './auth/state.types.ts';
import { ActionsContextType } from './types.ts';
import { CartState } from './cart/state.types.ts';

export const AuthContext = createContext<AuthState>({
  isLogged: false,
  username: '',
  role: 'guest',
});

export const CartContext = createContext<CartState>({
  products: [],
  total: 0,
});

export const ActionsContext = createContext<ActionsContextType | null>(null);
