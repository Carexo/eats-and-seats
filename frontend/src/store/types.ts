import {
  NotificationMessage,
  NotificationTypes,
} from './notification/state.types.ts';

export type ActionsContextType = {
  loginUser: (username: string) => void;
  logoutUser: () => void;
  notificationSend: (
    type: NotificationTypes,
    message: NotificationMessage,
  ) => void;
};
