import axios from 'axios'
import type {
  CategorySelector,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/todos-types/todosTypes'
import type { Token } from '../types/auth-types/authType'
import { store } from '../main'
import { resetIsAuth } from '../modules/slices/userSlice'

export const BASE_URL = 'https://easydev.club/api/v1'

const accessTokenStorage = () => {
  let accessToken: Token['accessToken'] | null = null
  return {
    setToken: (token: Token['accessToken']) => accessToken = token,
    getToken: () => accessToken,
    clearToken: () => accessToken = null 
  }
}

export const newAccessToken = accessTokenStorage()

const instance = axios.create({ baseURL: BASE_URL, withCredentials: true })


instance.interceptors.request.use((config) => {
  config.headers.Authorization = newAccessToken.getToken()
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
        const token = localStorage.getItem('tokenRef')
        const response = await axios.post<Token>(
          `${BASE_URL}/auth/refresh`,
          { refreshToken: token },
          { withCredentials: true }
        )
        newAccessToken.setToken(response.data.accessToken)
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

export const addTodo = async (title: string): Promise<Todo | undefined> => {
  const response = await instance.post('/todos', { title, isDone: false })
  return response.data
}

export const fetchTodos = async (
  category: CategorySelector
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
  const response = await instance.get(`/todos`, {
    params: {
      filter: category,
    },
  })
  return response.data
}

export const deleteTodos = async (id: Todo['id']): Promise<undefined> => {
  const response = await instance.delete(`/todos/${id}`)
  return response.data
}

export const editTodos = async (
  data: TodoRequest,
  id: Todo['id']
): Promise<Todo | undefined> => {
  const response = await instance.put(`/todos/${id}`, data)
  return response.data
}

export default instance
