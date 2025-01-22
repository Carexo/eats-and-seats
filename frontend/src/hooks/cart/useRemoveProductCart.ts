import { useActions, useAuth } from '../../store/hooks.ts';
import { useRemoveFromCart } from '../../api/queries/cart.ts';

export const useRemoveProductCart = () => {
  const { notificationSend, removeProduct, changeCart } = useActions();
  const { isLogged } = useAuth();

  const { mutate } = useRemoveFromCart(notificationSend, changeCart);

  if (isLogged) {
    return (dishId: string) => {
      mutate(dishId);
    };
  } else {
    return (dishId: string) => {
      removeProduct(dishId);
    };
  }
};
