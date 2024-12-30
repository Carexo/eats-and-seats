import { client } from '../index.ts';
import { isAxiosError } from 'axios';

export const getOpinionsByDishId = async (dishId: string) => {
  try {
    const response = await client.get(`/opinions/${dishId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.warn(error?.response?.data?.message);
    } else {
      console.warn('Failed to fetch dish opinions.');
    }
    return [];
  }
};
