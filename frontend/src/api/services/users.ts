import { client } from '../index.ts';
import { isAxiosError } from 'axios';

export const getUsers = async () => {
  try {
    const response = await client.get(`/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch users.');
    }
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await client.delete(`/users/${userId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to delete user.');
    }
  }
};
