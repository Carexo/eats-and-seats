import { CartPayload, useChangeProductCart } from '../../api/queries/cart.ts';
import { useActions, useAuth } from '../../store/hooks.ts';

export const useUpdateProductCart = () => {
  const { notificationSend, updateProduct, changeCart } = useActions();
  const { isLogged } = useAuth();

  const { mutate } = useChangeProductCart(notificationSend, changeCart);

  if (isLogged) {
    return (cartPayload: CartPayload) => {
      mutate(cartPayload);
    };
  } else {
    return (cartPayload: CartPayload) => {
      updateProduct(cartPayload);
      notificationSend('success', {
        title: 'Product updated in cart',
        description: 'Product updated in cart successfully',
      });
    };
  }
};
