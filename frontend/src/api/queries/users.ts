import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUser, getUsers } from '../services/users';
import { ActionsContextType } from '../../store/types.ts';

type User = {
  _id: string;
  username: string;
  email: string;
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: true,
  });
};

export const useDeleteUser = (
  notification: ActionsContextType['notificationSend'],
) => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      notification('success', {
        title: 'Delete User',
        description: 'User successfully deleted.',
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
