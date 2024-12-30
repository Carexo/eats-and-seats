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

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const reducerNotification = useReducer(notificationReducer, {
    notification: api,
  });
  const notificationDispatch = reducerNotification[1];

  const [auth, authDispatch] = useReducer(authReducer, {
    isLogged: false,
    username: '',
  });

  const actions = useMemo(
    () => ({
      loginUser: (username: string) =>
        authDispatch(authActions.loginUser(username)),
      logoutUser: () => authDispatch(authActions.logoutUser()),
      notificationSend: (
        type: NotificationTypes,
        message: NotificationMessage,
      ) => notificationDispatch(notificationActions.send(type, message)),
    }),
    [authDispatch],
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
