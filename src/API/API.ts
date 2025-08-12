import axios from 'axios'
import type {
  CategorySelector,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/types'

const instance = axios.create({ baseURL: 'https://easydev.club/api/v1' })

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
