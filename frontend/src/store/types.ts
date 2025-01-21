import {
  NotificationMessage,
  NotificationTypes,
} from './notification/state.types.ts';

import { UserPayload } from './auth/state.types.ts';

export type ActionsContextType = {
  loginUser: (user: UserPayload) => void;
  logoutUser: () => void;
  notificationSend: (
    type: NotificationTypes,
    message: NotificationMessage,
  ) => void;
};
