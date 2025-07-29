import React, { type Dispatch, type SetStateAction } from 'react'
import styles from './Todo-Tabs-Filter.module.scss'
import type { CategorySelecor, MetaResponse, Todo, TodoInfo } from '../../types/types'
import { fetchTodos } from '../../API/API'

interface TodoTabsFilterProps {
	amount: Record<CategorySelecor, number>
	category: CategorySelecor
	setTodos: Dispatch<SetStateAction<Todo[]>>
	setCategory: Dispatch<SetStateAction<CategorySelecor>>
	getTodos: (callback: () => Promise<MetaResponse<Todo, TodoInfo> | undefined>) => Promise<void>
}

function TodoTabsFilter({
	category,
	amount,
	setTodos,
	getTodos,
	setCategory
}: TodoTabsFilterProps) {

	const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
			const childElement = e.target as HTMLElement
			const child = childElement.closest('[data-id]')
			if (!child) return
			const childId = child.getAttribute('data-id') as CategorySelecor
			setTodos([])
			setCategory(childId)

			getTodos(() => fetchTodos(`${childId}`))
		}

	return (
		<nav className={styles.myNavigation} onClick={handleProgressClick}>
			<button
				disabled={category === 'all'}
				data-id='all'
				className={
					category === 'all' ? styles.myCategory : styles.myCategoryNotActive
				}
			>
				Все {amount.all}
			</button>
			<button
				disabled={category === 'inWork'}
				data-id='inWork'
				className={
					category === 'inWork'
						? styles.myCategory
						: styles.myCategoryNotActive
				}
			>
				В работе {amount.inWork}
			</button>
			<button
				disabled={category === 'completed'}
				data-id='completed'
				className={
					category === 'completed'
						? styles.myCategory
						: styles.myCategoryNotActive
				}
			>
				Сделано {amount.completed}
			</button>
		</nav>
	)
}

export default TodoTabsFilter
