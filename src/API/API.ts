import type { MetaResponse, Todo, TodoInfo, TodoRequest } from './types'

const baseUrl = 'https://easydev.club/api/v1'

export type status = 'all' | 'completed' | 'inWork'

export const addTodo = async (data: TodoRequest): Promise<Todo | undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const post: Todo = await response.json()

		return post
	} catch (er) {
		console.log(er)
	}
}

export const fetchTodos = async (
	param: status
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos?filter=${param}`)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const result = await response.json()
		return result
	} catch (er) {
		console.log(er)
	}
}

export const deleteTodos = async (id: Todo['id']): Promise<undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos/${id}`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
	} catch (er) {
		console.log(er)
	}
}

export const editTodos = async (
	data: TodoRequest,
	id: Todo['id']
): Promise<Todo | undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const result = await response.json()
		return result
	} catch (er) {
		console.log(er)
	}
}
