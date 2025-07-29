import { useEffect, useState } from 'react'
import styles from './Todo-List.module.scss'
import {
	fetchTodos,
} from '../../API/API'
import type { CategorySelecor, MetaResponse, Todo, TodoInfo} from '../../types/types'
import TodoItem from '../todo-item/Todo-Item'
import TodoTabsFilter from '../todo-tabs-filter/Todo-Tabs-Filter'
import AddTodo from '../add-todo/Add-Todo'

function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [category, setCategory] = useState<CategorySelecor>('all')
	const [amount, setAmount] = useState<Record<CategorySelecor, number>>({
		all: 0,
		completed: 0,
		inWork: 0,
	})

	const getTodos = async (callback: () => Promise<MetaResponse<Todo, TodoInfo> | undefined>) => {
		const data = await callback()
		if (data){
		setTodos(data.data)
		}
		if (data?.info){
		setAmount(data.info)}

	}
	
	const onSubmit = (event: any) => {
		event.preventDefault()
	}

	useEffect(() => {
		getTodos(() => fetchTodos('all'))
	}, [])

	return (
		<form onSubmit={onSubmit} className={styles.myForm}>
			<AddTodo
			category={category}
			getTodos={getTodos}
			setTodos={setTodos}
			/>
			<TodoTabsFilter
				amount={amount}
				category={category}
				getTodos={getTodos}
				setCategory={setCategory}
				setTodos={setTodos}
	
			/>
			<div className={styles.myForm}>
				{todos ? (
					todos.map((todo) => (
						<TodoItem
							category={category}
							getTodos={getTodos}
							setTodos={setTodos}
							key={todo.id}
							title={todo.title}
							isDone={todo.isDone}
							id={todo.id}
						></TodoItem>
					))
				) : (
					<h2>Нет постов</h2>
				)}
			</div>
		</form>
	)
}

export default TodoList
