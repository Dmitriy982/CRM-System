import React, { useEffect, useState } from 'react'
import styles from './Main-form.module.scss'
import {
	addTodo,
	deleteTodos,
	editTodos,
	fetchTodos,
	type status,
} from '../../API/API'
import type { Todo, TodoRequest } from '../../API/types'
import PostCard from '../post-card/Post-card'
import Header from '../header/Header'
import Navigation from '../navigation/Navigation'
import validation from '../../Validation/validation'

function MainForm() {
	const [posts, setPosts] = useState<Todo[]>([])
	const [isLoading] = useState<boolean>(false)
	const [category, setIsCategory] = useState<status>('all')
	const [myInput, setMyInput] = useState<TodoRequest['title']>('')
	const [isHideCategory, setIsHideCategory] = useState<Record<status, boolean>>(
		{
			all: false,
			completed: true,
			inWork: true,
		}
	)
	const [amount, setAmount] = useState<Record<status, number>>({
		all: 0,
		completed: 0,
		inWork: 0,
	})
	const getTodos = async (callback: any) => {
		const data = await callback
		setPosts(data.data)
		setAmount(data.info)
	}
	const handleSubmit = () => {
		if (validation(myInput)) return
		const trimedInput = myInput?.trim()
		addTodo({
			title: trimedInput,
			isDone: false,
		}).then((post) => {
			if (post) {
				setPosts((posts) => [ ...posts, post])
				getTodos(fetchTodos(category))
			}
		})
		setMyInput('')
	}

	const handleDelete = (id: Todo['id']) => {
		deleteTodos(id).then(() => {
			setPosts((post) => post.filter((p) => p.id != id))
			getTodos(fetchTodos(category))
		})
	}

	const handleEdit = (
		id: Todo['id'],
		title: string | null,
		isDone: Todo['isDone']
	) => {
		if (title) {
			editTodos({
				isDone: isDone,
				title: title,
				}, id ).then(() => {
				setPosts((posts) =>
					posts.map((post) =>
						post.id === id ? { ...post, title, isDone } : post
					)
				)
				getTodos(fetchTodos(category))
			})
		}
	}

	const isDoneCheck = (
		isDone: boolean,
		id: Todo['id'],
		title: Todo['title']
	) => {
		handleEdit(id, title, isDone)
	}

	const onSubmit = (event: any) => {
		event.preventDefault()
	}

	const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
		const childElement = e.target as HTMLElement
		const child = childElement.closest('[data-id]')
		if (!child) return

		const childId = child.getAttribute('data-id') as status
		setPosts([])
		setIsCategory(childId)
		setIsHideCategory({
			all: true,
			completed: true,
			inWork: true,
		})
		setIsHideCategory((prev) => ({
			...prev,
			[childId]: false,
		}))
		getTodos(fetchTodos(`${childId}`))
	}
	useEffect(() => {
		getTodos(fetchTodos('all'))
	}, [])

	return (
		<form onSubmit={onSubmit} className={styles.myForm}>
			<Header
				handleSubmit={handleSubmit}
				myInput={myInput}
				setMyInput={setMyInput}
			/>
			<Navigation
				amount={amount}
				handleProgressClick={handleProgressClick}
				isHideCategory={isHideCategory}
			/>
			<div className={styles.myForm}>
				{isLoading && <h1>Идет загрузка...</h1>}
				{posts ? (
					posts.map((post) => (
						<PostCard
							onIsDone={isDoneCheck}
							onEdit={handleEdit}
							onDelete={() => handleDelete(post.id)}
							key={post.id}
							title={post.title}
							isDone={post.isDone}
							id={post.id}
						></PostCard>
					))
				) : (
					<h2>Нет постов</h2>
				)}
			</div>
		</form>
	)
}

export default MainForm
