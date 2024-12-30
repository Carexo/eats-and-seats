import { useMutation } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser } from '../services/auth.ts';
import { ActionsContextType } from '../../store/types.ts';

export const useLogIn = (
  notificationSend: ActionsContextType['notificationSend'],
  storeLogin: ActionsContextType['loginUser'],
) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      storeLogin(data.data.username);
      notificationSend('success', {
        title: 'Login Successful',
        description: 'You have successfully logged in.',
      });
    },
    onError: (error) => {
      notificationSend('error', {
        title: 'Login Failed',
        description: error.message,
      });
    },
  });
};

export const useRegister = (
  notificationSend: ActionsContextType['notificationSend'],
  storeLoginUser: ActionsContextType['loginUser'],
) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      storeLoginUser(data.data.username);
      notificationSend('success', {
        title: 'Register Successful',
        description: 'You have successfully logged in.',
      });
    },
    onError: (error) => {
      notificationSend('error', {
        title: 'Register Failed',
        description: error.message,
      });
    },
  });
};

export const useLogout = (
  notificationSend: ActionsContextType['notificationSend'],
  storeLogoutUser: ActionsContextType['logoutUser'],
) => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      storeLogoutUser();
      notificationSend('success', {
        title: 'You are logged out!',
        description: 'You have successfully logged out.',
      });
    },
    onError: (error) => {
      notificationSend('success', {
        title: 'Logged out Failed',
        description: error.message,
      });
    },
  });
};
