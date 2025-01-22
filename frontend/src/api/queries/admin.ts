import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/admin.ts';
import { ActionsContextType } from '../../store/types.ts';

export const useChangePassword = (
  notification: ActionsContextType['notificationSend'],
  storeLogin: ActionsContextType['loginUser'],
) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      storeLogin({
        username: data.data.username,
        role: data.data.role,
      });
      notification('success', {
        title: 'Changed successfully',
        description: 'You have successfully changed your password.',
      });
    },
    onError: (error) => {
      notification('error', {
        title: 'Operation failed',
        description: error.message,
      });
    },
  });
};
