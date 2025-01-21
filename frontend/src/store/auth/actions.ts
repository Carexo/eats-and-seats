import { UserPayload } from './state.types.ts';

export const authActions = {
  logoutUser: () => ({ type: 'auth/logout' as const }),

  loginUser: (user: UserPayload) => ({
    type: 'auth/login' as const,
    payload: { user },
  }),
};

export type AuthActions =
  | ReturnType<typeof authActions.logoutUser>
  | ReturnType<typeof authActions.loginUser>;
