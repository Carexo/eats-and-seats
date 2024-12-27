import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../services/auth.ts';
import type { NotificationInstance } from 'antd/es/notification/interface';

export const useLogIn = (notification: NotificationInstance) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
      });
    },
    onError: (error) => {
      notification.error({
        message: 'Login Failed',
        description: error.message,
      });
    },
  });
};

export const useRegister = (notification: NotificationInstance) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      notification.success({
        message: 'Register Successful',
        description: 'You have successfully logged in.',
      });
    },
    onError: (error) => {
      notification.error({
        message: 'Register Failed',
        description: error.message,
      });
    },
  });
};
