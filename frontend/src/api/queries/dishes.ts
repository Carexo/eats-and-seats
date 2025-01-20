import { useQuery, useMutation } from '@tanstack/react-query';
import {getDishes, getCategories, getDishById, editDish, addDish, deleteDish} from '../services/dishes';
import { DishEditPayload } from '../../components/dishes/DishEdit/DishForm.types.ts';
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

export const useDishes = () => {
  return useQuery<Dish[]>({
    queryKey: ['dishes'],
    queryFn: getDishes,
    refetchOnWindowFocus: true,}
  );
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: true,
  });
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

export const useAddDish = (
    notification: ActionsContextType['notificationSend']) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (dish: DishEditPayload) => addDish(dish),
        onSuccess: () => {
            console.log('onSuccess called');
            notification('success', {
                title: 'Add successfully',
                description: 'You have successfully added the dish.',
            });
            setTimeout(() => {
                navigate(`/admin/dishes`);
            }, 1500);
        },
        onError: (error) => {
            notification('error', {
                title: 'Add failed',
                description: error.message,
            });
        },
    });
}

export const useDeleteDish = (
    notification: ActionsContextType['notificationSend']) => {
    return useMutation({
        mutationFn: (dishId: string) => deleteDish(dishId),
        onSuccess: () => {
            notification('success', {
                title: 'Delete successfully',
                description: 'You have successfully deleted the dish.',
            });
        },
        onError: (error) => {
            notification('error', {
                title: 'Delete failed',
                description: error.message,
            });
        },
    });
}

