import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { DishEditPayload } from '../../components/dishes/DishEdit/DishEditForm.types.ts';

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

export const getCategories = async () => {
  try {
    const response = await client.get('/dishes/categories');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch categories.');
    }
  }
};

export const getFilteredDishes = async (filter: {
  category: string;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  sortBy: string;
  page: number;
  limit: number;
}) => {
  try {
    const response = await client.get('/dishes/filter', {
      params: filter,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to fetch filtered dishes.');
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
      withCredentials: true,
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
      withCredentials: true,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const deleteDish = async (dishId: string) => {
  try {
    await client.delete(`/dishes/${dishId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.message);
    } else {
      throw new Error('Failed to delete dish.');
    }
  }
};
