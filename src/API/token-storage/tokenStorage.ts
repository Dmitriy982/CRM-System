import type { Token } from '../../types/auth-types/authType'

// const accessTokenStorage = () => {
//   let accessToken: Token['accessToken'] | null = null
//   return {
//     setToken: (token: Token['accessToken']) => (accessToken = token),
//     getToken: () => accessToken,
//     clearToken: () => (accessToken = null),
//   }
// }

//export const newAccessToken = accessTokenStorage()

export class accessTokenStorage {
  #accessToken: Token['accessToken'] | null = null
  setAccessToken(token: Token['accessToken']) {
    this.#accessToken = token
  }
  getAccessToken(): Token['accessToken'] | null {
    return this.#accessToken
  }
  clearAccessToken(): void {
    this.#accessToken = null
  }
  static setRefreshToken(token: Token['refreshToken']): void {
    localStorage.setItem('tokenRef', token)
  }
  static getRefreshToken(): string | null {
    return localStorage.getItem('tokenRef')
  }
  static clearRefreshToken() {
    localStorage.removeItem('tokenRef')
  }
}

export const newToken = new accessTokenStorage()
