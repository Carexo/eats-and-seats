import { client } from '../index.ts';
import { isAxiosError } from 'axios';

export const getUsers = async () => {
    try {
        const response = await client.get(`/users`);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.message);
        } else {
            throw new Error('Failed to fetch users.');
        }
    }
};