import { AuthActions } from './actions.ts';
import { AuthState } from './state.types.ts';

export const authReducer = (state: AuthState, action: AuthActions) => {
  if (action.type === 'auth/login') {
    return { ...state, username: action.payload.username, isLogged: true };
  }

  if (action.type === 'auth/logout') {
    return { ...state, isLogged: false };
  }

  return state;
};
