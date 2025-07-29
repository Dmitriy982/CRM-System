import type { CategorySelecor, MetaResponse, Todo, TodoInfo, TodoRequest } from '../types/types'

const baseUrl = 'https://easydev.club/api/v1'

export const addTodo = async (title: string): Promise<Todo | undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				title,
				isDone: false
			}),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const todo: Todo = await response.json()
		return todo
	} catch (er) {
		throw new Error(`HTTP error! Status: ${er}`)
	}
}

export const fetchTodos = async (
	category: CategorySelecor
): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
	try {
		const response = await fetch(`${baseUrl}/todos?filter=${category}`)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const result = await response.json()
		return result
	} catch (er) {
		throw new Error(`HTTP error! Status: ${er}`)
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
		throw new Error(`HTTP error! Status: ${er}`)
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
		throw new Error(`HTTP error! Status: ${er}`)
	}
}
