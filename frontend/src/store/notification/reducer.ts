import { NotificationActions } from './actions.ts';
import { NotificationState } from './state.types.ts';

export const notificationReducer = (
  state: NotificationState,
  action: NotificationActions,
) => {
  if (action.type === 'notification/send') {
    state.notification[action.payload.type]({
      message: action.payload.message.title,
      description: action.payload.message.description,
    });

    return state;
  }

  return state;
};
