import axios from 'axios'

import type { Token } from '../../types/auth-types/authType'
import { resetIsAuth } from '../../services/slices/userSlice'
import { store } from '../../main'
import { accessTokenStorage, newToken } from '../token-storage/tokenStorage'

export const BASE_URL = 'https://easydev.club/api/v1'

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = newToken.getAccessToken()
  return config
})

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const token = accessTokenStorage.getRefreshToken()
        const response = await axios.post<Token>(
          `${BASE_URL}/auth/refresh`,
          { refreshToken: token },
          { withCredentials: true }
        )
        newToken.setAccessToken(response.data.accessToken)
        return instance.request(originalRequest)
      } catch (e) {
        {
          store.dispatch(resetIsAuth())
          return Promise.reject(e)
        }
      }
    }
    return Promise.reject(error)
  }
)
