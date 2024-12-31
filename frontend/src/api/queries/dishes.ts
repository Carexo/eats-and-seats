import { useQuery, useMutation } from '@tanstack/react-query';
import { getDishById, editDish } from '../services/dishes';
import { DishEditPayload } from '../../components/dishes/DishEdit/DishEditForm.types';
import { useNavigate } from 'react-router';
import { ActionsContextType } from '../../store/types.ts';

type Dish = {
  imageType: string | undefined;
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

export const useUpdateDish = (
  notification: ActionsContextType['notificationSend'],
  dishId: string,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (dish: DishEditPayload) => editDish(dishId, dish),
    onSuccess: () => {
      notification('success', {
        title: 'Edit successfully',
        description: 'You have successfully edited the dish.',
      });

      setTimeout(() => {
        navigate(`/admin/dishdetails/${dishId}`);
      }, 1500);
    },
    onError: (error) => {
      notification('error', {
        title: 'Edition failed',
        description: error.message,
      });
    },
  });
};
