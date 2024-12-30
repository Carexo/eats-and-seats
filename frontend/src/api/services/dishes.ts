import { client } from '../index.ts';
import { isAxiosError } from 'axios';

export const getDishById = async (dishId: string) => {
  try {
    const response = await client.get(`/dishes/${dishId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch dish details.');
    }
  }
};
