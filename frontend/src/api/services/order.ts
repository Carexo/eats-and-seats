import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { CheckoutPayload } from '../queries/order.ts';

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
