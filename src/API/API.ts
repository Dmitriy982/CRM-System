import type {
  CategorySelector,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/todos-types/todosTypes'
import { instance } from './instance/instance'

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
