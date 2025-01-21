import { useQuery } from '@tanstack/react-query';
import { getOpinionsByDishId } from '../services/opinions';
import { useMutation } from '@tanstack/react-query';
import { addOpinion } from '../services/opinions.ts';
import { ActionsContextType } from '../../store/types.ts';

export const useOpinions = (dishId: string) => {
  return useQuery({
    queryKey: [['opinions'], dishId],
    queryFn: () => getOpinionsByDishId(dishId),
    refetchOnWindowFocus: true,
  });
};

export const useAddOpinion = (
  notification: ActionsContextType['notificationSend'],
) => {
  return useMutation({
    mutationFn: addOpinion,
    onSuccess: () => {
      notification('success', {
        title: 'Opinion is added',
        description: 'Opinion is added successfully',
      });
    },
    onError: (error) => {
      notification('error', {
        title: "Opinion can't be added",
        description: error.message,
      });
    },
  });
};
