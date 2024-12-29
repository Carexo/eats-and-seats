import { useQuery } from '@tanstack/react-query';
import { getDishById } from '../services/dishes';

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};


export const useDish = (dishId: string) => {
  return useQuery<Dish>({
    queryKey: ['dish', dishId],
    queryFn: () => getDishById(dishId),
    refetchOnWindowFocus: true,
  });
};