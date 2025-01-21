import React, { useMemo, useReducer } from 'react';
import { ActionsContext, AuthContext } from './index.ts';
import { authReducer } from './auth/reducer.ts';
import { authActions } from './auth/actions.ts';
import { notification } from 'antd';
import { notificationReducer } from './notification/reducer.ts';
import { notificationActions } from './notification/actions.ts';
import {
  NotificationMessage,
  NotificationTypes,
} from './notification/state.types.ts';
import { AuthState, UserPayload } from './auth/state.types.ts';

const initialAuthState: AuthState = {
  isLogged: false,
  username: '',
  role: 'guest',
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const reducerNotification = useReducer(notificationReducer, {
    notification: api,
  });
  const notificationDispatch = reducerNotification[1];

  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);

  const actions = useMemo(
    () => ({
      loginUser: (user: UserPayload) =>
        authDispatch(authActions.loginUser(user)),
      logoutUser: () => authDispatch(authActions.logoutUser()),
      notificationSend: (
        type: NotificationTypes,
        message: NotificationMessage,
      ) => notificationDispatch(notificationActions.send(type, message)),
    }),
    [authDispatch, notificationDispatch],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <AuthContext.Provider value={auth}>
        {contextHolder}
        {children}
      </AuthContext.Provider>
    </ActionsContext.Provider>
  );
};

export default Provider;
