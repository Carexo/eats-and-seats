import { createContext } from 'react';
import { AuthState } from './auth/state.types.ts';
import { ActionsContextType } from './types.ts';

export const AuthContext = createContext<AuthState>({
  isLogged: false,
  username: '',
});

export const ActionsContext = createContext<ActionsContextType | null>(null);
