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
import instance, { BASE_URL, newAccessToken } from '../../API/API'
import { initialState } from '../../core/initialState'
import axios, { AxiosError } from 'axios'
import {
  addAsyncBuilderCases,
  type IErrorData,
  type IServerError,
} from '../../core/utils'

export const registerUser = createAsyncThunk<
  null,
  UserRegistration,
  { rejectValue: IServerError }
>('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    await instance.post('/auth/signup', data)
    return null
  } catch (er) {
    const error = er as AxiosError<IErrorData>
    return rejectWithValue(
      error.response?.data || { message: 'Registration error' }
    )
  }
})

export const authUser = createAsyncThunk<
  null,
  AuthData,
  { rejectValue: IErrorData }
>('auth/authUser', async (data, { rejectWithValue }) => {
  try {
    const response = await instance.post('/auth/signin', data)
    newAccessToken.setToken(response.data.accessToken)
    localStorage.setItem('tokenRef', response.data.refreshToken)
    return null
  } catch (er) {
    const error = er as AxiosError<IErrorData>
    return rejectWithValue(error.response?.data || { message: 'Auth error' })
  }
})

export const checkAuth = createAsyncThunk<
  null,
  void,
  { rejectValue: IErrorData }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('tokenRef')
    const response = await axios.post<Token>(
      `${BASE_URL}/auth/refresh`,
      { refreshToken: token },
      { withCredentials: true }
    )
    newAccessToken.setToken(response.data.accessToken)
    localStorage.setItem('tokenRef', response.data.refreshToken)
    return null
  } catch (er) {
    const error = er as AxiosError<IErrorData>
    return rejectWithValue(
      error.response?.data || { message: 'CheckAuth error' }
    )
  }
})

export const logout = createAsyncThunk<null, void, { rejectValue: IErrorData }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await instance.post(`/user/logout`)
      newAccessToken.clearToken()
      localStorage.removeItem('tokenRef')
      return null
    } catch (er) {
      const error = er as AxiosError<IErrorData>
      return rejectWithValue(
        error.response?.data || { message: 'Logout error' }
      )
    }
  }
)

export const getUser = createAsyncThunk<
  Profile,
  void,
  { rejectValue: IErrorData }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get(`/user/profile`)
    return response.data
  } catch (er) {
    const error = er as AxiosError<IErrorData>
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
  },
})

export default userSlice.reducer
export const { setIsAuth, resetIsAuth, setIsAuthChecked, setIsReg } =
  userSlice.actions
