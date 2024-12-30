export const authActions = {
  logoutUser: () => ({ type: 'auth/logout' as const }),

  loginUser: (username: string) => ({
    type: 'auth/login' as const,
    payload: { username: username },
  }),
};

export type AuthActions =
  | ReturnType<typeof authActions.logoutUser>
  | ReturnType<typeof authActions.loginUser>;
