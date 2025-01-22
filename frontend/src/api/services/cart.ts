import { client } from '../index.ts';
import { ApiResponse } from '../types.ts';
import { isAxiosError } from 'axios';
import { CartState } from '../../store/cart/state.types.ts';

export const getCart = async () => {
  try {
    const response = await client.get<ApiResponse<CartState>>('/cart', {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const addToCart = async (dishId: string, quantity: number) => {
  try {
    const response = await client.post<ApiResponse<CartState>>(
      `/cart/add/${dishId}`,
      {
        quantity: quantity,
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const removeFromCart = async (dishId: string) => {
  try {
    const response = await client.delete<ApiResponse<CartState>>(
      `/cart/remove/${dishId}`,
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const changeProductCart = async (dishId: string, quantity: number) => {
  try {
    const response = await client.put<ApiResponse<CartState>>(
      `/cart/update/${dishId}`,
      {
        quantity,
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};
