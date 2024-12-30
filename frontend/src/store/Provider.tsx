import React, { useMemo, useReducer } from 'react';
import { ActionsContext, AuthContext } from './index.ts';
import { authReducer } from './auth/reducer.ts';
import { authActions } from './auth/actions.ts';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    isLogged: false,
    username: '',
  });

  const actions = useMemo(
    () => ({
      loginUser: (username: string) =>
        authDispatch(authActions.loginUser(username)),
      logoutUser: () => authDispatch(authActions.logoutUser()),
    }),
    [authDispatch],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </ActionsContext.Provider>
  );
};

export default Provider;
