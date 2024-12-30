import { useMutation } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser } from '../services/auth.ts';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { ActionsContextType } from '../../store/types.ts';

export const useLogIn = (
  notification: NotificationInstance,
  storeLogin: ActionsContextType['loginUser'],
) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      storeLogin('jan');
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

export const useLogout = (
  notification: NotificationInstance,
  storeLogoutUser: ActionsContextType['logoutUser'],
) => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      storeLogoutUser();
      notification.success({
        message: 'You are logged out!',
        description: 'You have successfully logged out.',
      });
    },
    onError: (error) => {
      notification.error({
        message: 'Logged out Failed',
        description: error.message,
      });
    },
  });
};
