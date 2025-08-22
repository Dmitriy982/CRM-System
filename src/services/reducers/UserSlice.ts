import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
  AuthData,
  Profile,
  Token,
  UserRegistration,
} from '../../types/auth-types/authType'
import instance, { BASE_URL, newAccessToken } from '../../API/API'
import axios from 'axios'
import type { ErrorPayload } from 'vite/types/hmrPayload.js'

interface UserState {
  isRegister: boolean
  isAuth: boolean
  regError: string
  autError: string
  user: Profile
  userError: string
}

const initialState: UserState = {
  isRegister: false,
  isAuth: false,
  regError: '',
  autError: '',
  userError: '',
  user: {
    date: '',
    email: '',
    id: 0,
    isBlocked: true,
    phoneNumber: '',
    roles: [],
    username: '',
  },
}

export const registerUser = createAsyncThunk<
  void,
  UserRegistration,
  { rejectValue: ErrorPayload | string }
>('auth/registerUser', async (data, { rejectWithValue, dispatch }) => {
  try {
    dispatch(resetRegError())
    await instance.post('/auth/signup', data)
  } catch (er: any) {
    return rejectWithValue(er.response?.data || 'Reg error')
  }
})

export const authUser = createAsyncThunk<
  void,
  AuthData,
  { rejectValue: ErrorPayload | string }
>('auth/authUser', async (data, { rejectWithValue, dispatch }) => {
  try {
    dispatch(resetAutError())
    const response = await instance.post('/auth/signin', data)
    newAccessToken.setToken(response.data.accessToken)
    localStorage.setItem('tokenRef', response.data.refreshToken)
  } catch (er: any) {
    return rejectWithValue(er.response?.data || 'Ошибка входа')
  }
})

export const checkAuth = createAsyncThunk<
  void,
  void,
  { rejectValue: ErrorPayload | string }
>('auth/checkAuth', async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem('tokenRef')
    const response = await axios.post<Token>(
      `${BASE_URL}/auth/refresh`,
      { refreshToken: token },
      { withCredentials: true }
    )
    dispatch(setIsAuth())
    newAccessToken.setToken(response.data.accessToken)
    localStorage.setItem('tokenRef', response.data.refreshToken)
  } catch (er: any) {
    return rejectWithValue(er.response?.data || 'Ошибка обновления')
  }
})

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: ErrorPayload | string }
>('user/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    await instance.post(`/user/logout`)
    dispatch(resetIsAuth())
    newAccessToken.clearToken()
    localStorage.removeItem('tokenRef')
  } catch (er: any) {
    return rejectWithValue(er.response?.data || 'Ошибка выхода')
  }
})

export const getUser = createAsyncThunk<
  Profile,
  void,
  { rejectValue: ErrorPayload | string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get(`/user/profile`)
    return response.data
  } catch (er: any) {
    return rejectWithValue(er.response?.data || 'Ошибка получения данных')
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegError: (state) => {
      state.regError = ''
    },
    resetAutError: (state) => {
      state.autError = ''
    },
    setIsAuth: (state) => {
      state.isAuth = true
    },
    resetIsAuth: (state) => {
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.regError = action.payload as string
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegister = true
      })
      .addCase(authUser.rejected, (state, action) => {
        state.autError = action.payload as string
      })
      .addCase(authUser.fulfilled, (state) => {
        state.isAuth = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userError = action.payload as string
      })
  },
})

export default userSlice.reducer
export const { resetRegError, resetAutError, setIsAuth, resetIsAuth } =
  userSlice.actions
