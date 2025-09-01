import type { Profile } from '../../types/auth-types/authType'
import { initAsyncParticle, type AsyncParticle } from '../utils/utils'

export interface UserState {
  user: AsyncParticle<Profile | null>
  register: AsyncParticle<Profile | null>
  login: AsyncParticle<null>
  checkAuth: AsyncParticle<null>
  logout: AsyncParticle<null>
  isRegister: boolean
  isAuth: boolean
  isAuthChecked: boolean
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
}
