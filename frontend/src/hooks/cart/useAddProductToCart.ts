import { useActions, useAuth } from '../../store/hooks.ts';
import { useAddToCart } from '../../api/queries/cart.ts';
import { Product } from '../../store/cart/state.types.ts';

export const useAddProductToCart = () => {
  const { notificationSend, addProduct, changeCart } = useActions();
  const { isLogged } = useAuth();

  const { mutate } = useAddToCart(notificationSend, changeCart);

  if (isLogged) {
    return ({ dishId, quantity }: Product) => {
      mutate({ dishId, quantity });
    };
  } else {
    return (product: Product) => {
      addProduct(product);
      notificationSend('success', {
        title: 'Product added to cart',
        description: 'Product added to cart successfully',
      });
    };
  }
};
