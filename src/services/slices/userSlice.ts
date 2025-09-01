import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type {
  AuthData,
  Profile,
  Token,
  UserRegistration,
} from '../../types/auth-types/authType'
import { initialState } from '../initial-states/initialState'
import axios, { AxiosError } from 'axios'
import {
  addAsyncBuilderCases,
  type ErrorData,
  type ServerError,
} from '../utils/utils'
import { BASE_URL, instance } from '../../API/instance/instance'
import {
  accessTokenStorage,
  newToken,
} from '../../API/token-storage/tokenStorage'

export const registerUser = createAsyncThunk<
  void,
  UserRegistration,
  { rejectValue: ServerError }
>('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    await instance.post('/auth/signup', data)
  } catch (er) {
    const error = er as AxiosError<ErrorData>
    return rejectWithValue(
      error.response?.data || { message: 'Registration error' }
    )
  }
})

export const authUser = createAsyncThunk<
  void,
  AuthData,
  { rejectValue: ErrorData }
>('auth/authUser', async (data, { rejectWithValue }) => {
  try {
    const response = await instance.post('/auth/signin', data)
    newToken.setAccessToken(response.data.accessToken)
    accessTokenStorage.setRefreshToken(response.data.refreshToken)
  } catch (er) {
    const error = er as AxiosError<ErrorData>
    return rejectWithValue(error.response?.data || { message: 'Auth error' })
  }
})

export const checkAuth = createAsyncThunk<
  void,
  void,
  { rejectValue: ErrorData }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const token = accessTokenStorage.getRefreshToken()
    const response = await axios.post<Token>(
      `${BASE_URL}/auth/refresh`,
      { refreshToken: token },
      { withCredentials: true }
    )
    newToken.setAccessToken(response.data.accessToken)
    accessTokenStorage.setRefreshToken(response.data.refreshToken)
  } catch (er) {
    const error = er as AxiosError<ErrorData>
    return rejectWithValue(
      error.response?.data || { message: 'CheckAuth error' }
    )
  }
})

export const logout = createAsyncThunk<void, void, { rejectValue: ErrorData }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await instance.post(`/user/logout`)
      newToken.clearAccessToken()
      accessTokenStorage.clearRefreshToken()
    } catch (er) {
      const error = er as AxiosError<ErrorData>
      return rejectWithValue(
        error.response?.data || { message: 'Logout error' }
      )
    }
  }
)

export const getUser = createAsyncThunk<
  Profile,
  void,
  { rejectValue: ErrorData }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get(`/user/profile`)
    return response.data
  } catch (er) {
    const error = er as AxiosError<ErrorData>
    return rejectWithValue(error.response?.data || { message: 'GetUser error' })
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = true
    },
    setIsReg: (state) => {
      state.isRegister = true
    },
    resetIsAuth: (state) => {
      state.isAuth = false
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
  },
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, getUser, 'user')
    addAsyncBuilderCases(builder, registerUser, 'register')
    addAsyncBuilderCases(builder, authUser, 'login')
    addAsyncBuilderCases(builder, checkAuth, 'checkAuth')
    addAsyncBuilderCases(builder, logout, 'logout')
  },
})

export default userSlice.reducer
export const { setIsAuth, resetIsAuth, setIsAuthChecked, setIsReg } =
  userSlice.actions
