import { useActions, useAuth } from '../../store/hooks.ts';
import { useGetCart } from '../../api/queries/cart.ts';

export const useGetInitCart = () => {
  const { getCart, changeCart } = useActions();
  const { isLogged } = useAuth();

  const { mutate } = useGetCart(changeCart);

  if (isLogged) {
    return () => {
      mutate();
    };
  } else {
    return () => {
      getCart();
    };
  }
};
