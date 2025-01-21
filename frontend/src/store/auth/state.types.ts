export interface AuthState {
  isLogged: boolean;
  username: string;
  role: authRoles | 'guest';
}

export interface UserPayload {
  username: string;
  role: authRoles;
}

export type authRoles = 'admin' | 'user';
