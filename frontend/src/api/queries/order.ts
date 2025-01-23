import { useMutation, useQuery } from '@tanstack/react-query';
import {
  cancelOrder,
  createOrder,
  getOrders,
  getUserOrders,
} from '../services/order.ts';
import { useActions, useAuth, useCart } from '../../store/hooks.ts';
import {
  Address,
  CheckoutFormPayload,
} from '../../components/checkout/CheckoutForm.types.ts';
import { useNavigate } from 'react-router';

export interface CheckoutPayload {
  address: Address;
  products?: { dishId: string; quantity: number }[];
  total?: number;
  email?: string;
}

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const { notificationSend, changeCart } = useActions();
  const auth = useAuth();
  const cart = useCart();

  const { mutate } = useMutation({
    mutationFn: (checkoutPayload: CheckoutPayload) =>
      createOrder(checkoutPayload),
    onSuccess: () => {
      notificationSend('success', {
        title: 'Order is created',
        description: 'Order is created successfully',
      });

      changeCart({ products: [], total: 0 });

      setTimeout(() => {
        navigate(`/`);
      }, 1000);
    },
    onError: (error) => {
      notificationSend('error', {
        title: "Order can't be created",
        description: error.message,
      });
    },
  });

  if (auth.isLogged) {
    return (checkoutFormPayload: CheckoutFormPayload) => {
      mutate({
        address: {
          firstName: checkoutFormPayload.firstName,
          lastName: checkoutFormPayload.lastName,
          street: checkoutFormPayload.street,
          city: checkoutFormPayload.city,
          state: checkoutFormPayload.state,
          zipcode: checkoutFormPayload.zipcode,
          country: checkoutFormPayload.country,
        },
      });
    };
  } else {
    return (checkoutFormPayload: CheckoutFormPayload) => {
      mutate({
        email: checkoutFormPayload.email,
        address: {
          firstName: checkoutFormPayload.firstName,
          lastName: checkoutFormPayload.lastName,
          street: checkoutFormPayload.street,
          city: checkoutFormPayload.city,
          state: checkoutFormPayload.state,
          zipcode: checkoutFormPayload.zipcode,
          country: checkoutFormPayload.country,
        },
        products: cart.products.map((product) => ({
          dishId: product.dishId,
          quantity: product.quantity,
        })),
        total: cart.total,
      });
    };
  }
};

export const useOrders = (sortOrder?: string) => {
  return useQuery({
    queryKey: ['orders', sortOrder || 'default'],
    queryFn: () => getOrders(sortOrder || ''),
    refetchOnWindowFocus: true,
  });
};

export const useUserOrders = (
  username: string,
  sortOrder?: string,
  user_id?: string,
) => {
  return useQuery({
    queryKey: [
      'userOrders',
      username,
      sortOrder || 'default',
      user_id || 'none',
    ],
    queryFn: () => getUserOrders(sortOrder || '', user_id || ''),
    refetchOnWindowFocus: true,
  });
};

export const useCancelOrder = () => {
  const { notificationSend } = useActions();
  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      notificationSend('success', {
        title: 'Order is canceled',
        description: 'Order is canceled successfully',
      });
    },
    onError: (error) => {
      notificationSend('error', {
        title: "Order can't be canceled",
        description: error.message,
      });
    },
  });
};
