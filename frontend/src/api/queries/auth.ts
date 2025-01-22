import { useMutation } from '@tanstack/react-query';
import {
  checkUserStatus,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.ts';
import {useNavigate} from "react-router";
import {useActions} from "../../store/hooks.ts";

export const useLogIn = () => {
  const navigate = useNavigate();
  const {notificationSend, loginUser: storeLoginUser} = useActions();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      storeLoginUser({ username: data.data.username, role: data.data.role });
      notificationSend('success', {
        title: 'Login Successful',
        description: 'You have successfully logged in.',
      });
      setTimeout(() => {
        navigate(`/`);
      }, 1000);
    },
    onError: (error) => {
      notificationSend('error', {
        title: 'Login Failed',
        description: error.message,
      });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const {notificationSend, loginUser: storeLoginUser} = useActions();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      storeLoginUser({ username: data.data.username, role: data.data.role });
      notificationSend('success', {
        title: 'Register Successful',
        description: 'You have successfully logged in.',
      });

        setTimeout(() => {
            navigate(`/`);
        }, 1000);
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
) => {

  const {notificationSend, logoutUser : storeLogoutUser} = useActions();
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

export const useCheckLoggedStatus = () => {
  const {loginUser: storeLoginUser} = useActions();

  return useMutation({
    mutationFn: checkUserStatus,
    onSuccess: (data) => {
      storeLoginUser({ username: data.data.username, role: data.data.role });
    },
  });
};
