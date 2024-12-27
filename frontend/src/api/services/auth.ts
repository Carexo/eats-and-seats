import { client } from '../index.ts';
import { LoginUserPayload } from '../../components/auth/LoginForm/LoginForm.types.ts';
import { isAxiosError } from 'axios';
import { RegisterUserPayload } from '../../components/auth/RegisterForm/RegisterForm.types.ts';

export const loginUser = async (user: LoginUserPayload) => {
  try {
    await client.post(
      '/auth/login',
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true },
    );
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
    await client.post(
      '/auth/register',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      { withCredentials: true },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data.error.message);
    } else {
      throw new Error('something went wrong');
    }
  }
};
