import { AuthActions } from './actions.ts';
import { AuthState } from './state.types.ts';

export const authReducer = (state: AuthState, action: AuthActions) => {
  if (action.type === 'auth/login') {
    console.log(action.payload.user);
    return {
      ...state,
      username: action.payload.user.username,
      isLogged: true,
      role: action.payload.user.role,
    };
  }

  if (action.type === 'auth/logout') {
    return { ...state, isLogged: false, role: 'guest' as 'guest' };
  }

  return state;
};
