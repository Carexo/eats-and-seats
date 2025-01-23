import { useMutation } from '@tanstack/react-query';

import {
  addToCart,
  changeProductCart,
  getCart,
  removeFromCart,
} from '../services/cart.ts';
import { ActionsContextType } from '../../store/types.ts';

export interface CartPayload {
  dishId: string;
  quantity: number;
}

export const useGetCart = (changeCart: ActionsContextType['changeCart']) => {
  return useMutation({
    mutationFn: getCart,
    onSuccess: (data) => {
      changeCart(data.data);
    },
  });
};

export const useAddToCart = (
  notification: ActionsContextType['notificationSend'],
  changeCart: ActionsContextType['changeCart'],
) => {
  return useMutation({
    mutationFn: ({ dishId, quantity }: CartPayload) =>
      addToCart(dishId, quantity),
    onSuccess: (data) => {
      changeCart(data.data);
      notification('success', {
        title: 'Successfully  add dish to cart',
        description: 'You have successfully edited the dish.',
      });
    },
    onError: (error) => {
      notification('error', {
        title: 'Add failed',
        description: error.message,
      });
    },
  });
};

export const useRemoveFromCart = (
  notification: ActionsContextType['notificationSend'],
  changeCart: ActionsContextType['changeCart'],
) => {
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      changeCart(data.data);
      notification('success', {
        title: 'Successfully removed dish from cart',
        description: 'You have successfully removed the dish.',
      });
    },
    onError: (error) => {
      notification('error', {
        title: 'Remove failed',
        description: error.message,
      });
    },
  });
};

export const useChangeProductCart = (
  notification: ActionsContextType['notificationSend'],
  changeCart: ActionsContextType['changeCart'],
) => {
  return useMutation({
    mutationFn: ({ dishId, quantity }: CartPayload) =>
      changeProductCart(dishId, quantity),
    onSuccess: (data) => {
      changeCart(data.data);
      notification('success', {
        title: 'Successfully edited dish in cart',
        description: 'You have successfully edit the dish.',
      });
    },
    onError: (error) => {
      notification('error', {
        title: 'Edit failed',
        description: error.message,
      });
    },
  });
};
