import { useQuery } from '@tanstack/react-query';
import {
    deleteOpinion,
    getAverageRating,
    getOpinions,
    getOpinionsByDishId,
    getOpinionsByUserId, updateOpinion
} from '../services/opinions';

import { useMutation } from '@tanstack/react-query';
import { addOpinion } from '../services/opinions.ts';
import { ActionsContextType } from '../../store/types.ts';
import {OpinionPayload} from "../../components/opinions/AddOpinion/AddOpinion.types.ts";

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

export const useDeleteOpinion = (
  notification: ActionsContextType['notificationSend'],
) => {
  return useMutation({
    mutationFn: deleteOpinion,
    onSuccess: () => {
      notification('success', {
        title: 'Delete Opinion',
        description: 'Opinion successfully deleted.',
      });
    },
    onError: (error) => {
      notification('error', {
        title: 'Deletion failed',
        description: error.message,
      });
    },
  });
};

export const useAllOpinions = (sort? : string) => {
    return useQuery({
        queryKey: ['opinions', sort||'default'],
        queryFn: () => getOpinions(sort||''),
        refetchOnWindowFocus: true,
    });
}

export const useAverageRating = (dishId: string) => {
    return useQuery({
        queryKey: ['average', dishId],
        queryFn: () => getAverageRating(dishId),
        refetchOnWindowFocus: true,
    });
}

export const useOpinionsByUserId = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: getOpinionsByUserId,
        refetchOnWindowFocus: true,
    });
}

export const useUpdateOpinion = (
    notification: ActionsContextType['notificationSend'], opinionId: string, values: OpinionPayload
) => {
    return useMutation({
        mutationFn: () => updateOpinion(opinionId, values),
        onSuccess: () => {
            notification('success', {
                title: 'Opinion updated',
                description: 'Opinion updated successfully',
            });
        },
        onError: (error) => {
            notification('error', {
                title: "Opinion can't be updated",
                description: error.message,
            });
        },
    });
};
