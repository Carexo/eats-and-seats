import { useContext } from 'react';
import { ActionsContext, AuthContext, CartContext } from './index.ts';

export const useActions = () => {
  const actions = useContext(ActionsContext);
  if (!actions) {
    throw new Error('No actions');
  }

  return actions;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useCart = () => {
  return useContext(CartContext);
};
