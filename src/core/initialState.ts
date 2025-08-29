import type { Profile } from '../types/auth-types/authType';
import { initAsyncParticle, type IAsyncParticle } from './utils';


export interface UserState {
  user: IAsyncParticle<Profile | null>;
  register: IAsyncParticle<Profile | null>;
  login: IAsyncParticle<null>;
  checkAuth: IAsyncParticle<null>;
  logout: IAsyncParticle<null>;
  isRegister: boolean;
  isAuth: boolean;
  isAuthChecked: boolean;
}

export const initialState: UserState = {
  user: initAsyncParticle<Profile | null>(null),
  register: initAsyncParticle<Profile | null>(null),
  login: initAsyncParticle<null>(null),
  checkAuth: initAsyncParticle<null>(null),
  logout: initAsyncParticle<null>(null),
  isRegister: false,
  isAuth: false,
  isAuthChecked: false,
};
