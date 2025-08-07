import axios from 'axios'
import type {
  CategorySelector,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/types'

const baseUrl = 'https://easydev.club/api/v1'

// export const addTodo = async (title: string): Promise<Todo | undefined> => {
//   const response = await axios.post(`${baseUrl}/todos`, {
//     title,
//     isDone: false,
//   })
//   return response.data
// }

// export const fetchTodos = async (
//   category: CategorySelector
// ): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
//   const response = await axios.get(`${baseUrl}/todos`,
//     {
//       params: {
//         filter: category
//       }
//     }
//   )
//   return response.data
// }

// export const deleteTodos = async (id: Todo['id']): Promise<undefined> => {
//   const response = await axios.delete(`${baseUrl}/todos/${id}`)
//   return response.data
// }

// export const editTodos = async (
//   data: TodoRequest,
//   id: Todo['id']
// ): Promise<Todo | undefined> => {
//   const response = await axios.put(`${baseUrl}/todos/${id}`, data)
//   return response.data
// }

export default class PostService {
    static async addTodo(title: string): Promise<Todo | undefined> {
      const response = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone: false,
  })
  return response.data
}

static async fetchTodos  (
  category: CategorySelector
): Promise<MetaResponse<Todo, TodoInfo> | undefined>  {
  const response = await axios.get(`${baseUrl}/todos`,
    {
      params: {
        filter: category
      }
    }
  )
  return response.data
}

static async deleteTodos  (id: Todo['id']): Promise<undefined> {
  const response = await axios.delete(`${baseUrl}/todos/${id}`)
  return response.data
}

static async editTodos(
  data: TodoRequest,
  id: Todo['id']
): Promise<Todo | undefined> {
  const response = await axios.put(`${baseUrl}/todos/${id}`, data)
  return response.data
}
}
