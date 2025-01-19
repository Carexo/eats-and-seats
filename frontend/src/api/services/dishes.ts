import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { DishEditPayload } from '../../components/dishes/DishEdit/DishForm.types.ts';

export const getDishes = async () => {
  try {
    const response = await client.get(`/dishes`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch dishes.');
    }
  }
};

interface Category {
  category: string;
}

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await client.get<Category[]>(`/dishes`);
    const dishes = response.data;
    const categories = Array.from(new Set(dishes.map((dish) => dish.category)));
    return categories;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch categories.');
    }
  }
};


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

export const editDish = async (dishId: string, dish: DishEditPayload) => {
  try {
    const formData = new FormData();
    formData.append('name', dish.name);
    formData.append('description', dish.description);
    formData.append('category', dish.category);
    formData.append('price', dish.price);
    if (dish.image) {
      formData.append('image', dish.image);
    }

    await client.put(`/dishes/${dishId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const addDish = async (dish: DishEditPayload) => {
    try {
        const formData = new FormData();
        formData.append('name', dish.name);
        formData.append('description', dish.description);
        formData.append('category', dish.category);
        formData.append('price', dish.price);
        if (dish.image) {
        formData.append('image', dish.image);
        }

        await client.post('/dishes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
    } catch (error) {
        if (isAxiosError(error)) {
        throw new Error(error?.response?.data.error.message);
        } else {
        throw new Error('something went wrong');
        }
    }
}
