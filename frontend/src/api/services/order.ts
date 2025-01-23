import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { CheckoutPayload } from '../queries/order.ts';

export interface IOrder {
  _id: string; // ID zamówienia
  email?: string; // Email użytkownika (dla gościa)
  user?: string; // ID użytkownika (dla zarejestrowanego użytkownika)
  address: {
    street: string; // Ulica
    city: string; // Miasto
    state: string; // Województwo / stan
    zipcode: string; // Kod pocztowy
    country: string; // Kraj
    _id: string; // ID adresu
  };
  products: {
    dishId: {
      _id: string; // ID dania
      name: string; // Nazwa dania
      description: string; // Opis dania
      category: string; // Kategoria dania
      price: number; // Cena dania
      imageType: string; // Typ obrazu (np. webp)
      __v: number; // Wersja dokumentu w bazie danych
    };
    quantity: number; // Ilość produktu w zamówieniu
    _id: string; // ID pozycji w zamówieniu
  }[];
  total: number; // Całkowita cena zamówienia
  status: string; // Status zamówienia (np. "pending")
  orderDate: string; // Data zamówienia w formacie ISO
  __v: number; // Wersja dokumentu w bazie danych
}

export const createOrder = async (checkoutPayload: CheckoutPayload) => {
  try {
    await client.post(
      '/order/create',
      {
        ...checkoutPayload,
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

export const getOrders = async (sort?: string) => {
  try {
    const response = await client.get(`/order?sort=${sort || ''}`, {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const getUserOrders = async (sort?: string, user_id?: string) => {
  try {
    const response = await client.get(
      `/order/user?sort=${sort || ''}&user=${user_id || ''}`,
      {
        withCredentials: true,
      },
    );
    return response.data || [];
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    await client.get(`/order/cancel/${orderId}`, {
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
