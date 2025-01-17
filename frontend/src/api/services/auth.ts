import { client } from '../index.ts';
import { LoginUserPayload } from '../../components/auth/LoginForm/LoginForm.types.ts';
import { isAxiosError } from 'axios';
import { RegisterUserPayload } from '../../components/auth/RegisterForm/RegisterForm.types.ts';
import { ApiResponse } from '../types.ts';

export interface UserResponse {
  username: string;
}

export const loginUser = async (user: LoginUserPayload) => {
  try {
    const response = await client.post<ApiResponse<UserResponse>>(
      '/auth/login',
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const registerUser = async (user: RegisterUserPayload) => {
  try {
    const response = await client.post<ApiResponse<UserResponse>>(
      '/auth/register',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const logoutUser = async () => {
  try {
    await client.get('/auth/logout', { withCredentials: true });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const checkUserStatus = async () => {
  try {
    const response = await client.get<ApiResponse<UserResponse>>(
      '/auth/status',
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};
