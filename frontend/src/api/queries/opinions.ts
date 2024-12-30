import { useQuery } from '@tanstack/react-query';
import { getOpinionsByDishId } from '../services/opinions';

export const useOpinions = (dishId: string) => {
  return useQuery<[]>({
    queryKey: [['opinions'], dishId],
    queryFn: () => getOpinionsByDishId(dishId),
    refetchOnWindowFocus: true,
  });
};
