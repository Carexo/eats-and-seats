import { NotificationMessage, NotificationTypes } from './state.types.ts';

export const notificationActions = {
  send: (type: NotificationTypes, message: NotificationMessage) => ({
    type: 'notification/send' as const,
    payload: { type, message },
  }),
};

export type NotificationActions = ReturnType<typeof notificationActions.send>;
