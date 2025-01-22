import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { OpinionPayload } from '../../components/opinions/AddOpinion/AddOpinion.types.ts';
import { ApiResponse } from '../types.ts';

export interface IOpinion {
  opinionID: string;
  rating: number;
  description?: string;
  username: string;
}

export interface IExtendOpinion extends IOpinion {
  dish_name: string;
}

export const getOpinionsByDishId = async (dishId: string) => {
  try {
    const response = await client.get<ApiResponse<IOpinion[]>>(
      `/opinions/${dishId}`,
    );

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.warn(error?.response?.data?.message);
    } else {
      console.warn('Failed to fetch dish opinions.');
    }
  }
};

export const addOpinion = async ({
  dishID,
  opinion,
}: {
  dishID: string;
  opinion: OpinionPayload;
}) => {
  try {
    await client.post(
      '/opinions/add',
      {
        dish_id: dishID,
        rating: opinion.rate,
        description: opinion.description,
      },
      { withCredentials: true },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const deleteOpinion = async (opinionId: string) => {
    try {
        await client.delete(`/opinions/${opinionId}`, {
            withCredentials: true,
        });
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.message);
        } else {
            throw new Error('Failed to delete opinion.');
        }
    }
};

export const getOpinions = async ( sort? : string ) => {
    try {
        const response = await client.get(
            `/opinions?sort=${sort || ''}`,
        );
        return response.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
        console.warn(error?.response?.data.message);
        } else {
        console.warn('Failed to fetch opinions.');
        }
    }
}
