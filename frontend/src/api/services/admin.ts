import { client } from '../index.ts';
import { isAxiosError } from 'axios';
import { ChangePasswordPayload } from '../../components/admin/ChangePassword/ChangePassword.types.ts';
import { ApiResponse } from '../types.ts';
import { UserResponse } from './auth.ts';

export const changePassword = async (payload: ChangePasswordPayload) => {
  try {
    const response = await client.patch<ApiResponse<UserResponse>>(
      `/users/change-password`,
      {
        email: payload.email,
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('Failed to change password.');
    }
  }
};
