import { useState, type Dispatch, type ReactElement, type SetStateAction } from 'react'
import type { CategorySelecor, MetaResponse, Todo, TodoInfo } from '../../types/types'
import MyButton from '../../UI/MyButton'
import styles from './Todo-Item.module.scss'
import titleValidation from '../../Validation/validation'
import { deleteTodos, editTodos, fetchTodos } from '../../API/API'

interface TodoItemProps extends Omit<Todo, 'created'>  {
	setTodos: Dispatch<SetStateAction<Todo[]>>
	getTodos: (callback: () => Promise<MetaResponse<Todo, TodoInfo> | undefined>) => Promise<void>
	category: CategorySelecor
}

function TodoItem({setTodos, getTodos, category, id, title, isDone}: TodoItemProps): ReactElement {
	const [isChecked, setIsChecked] = useState<boolean>(isDone)
	const [inputEditValue, setEditInputValue] = useState<boolean>(true)
	const [inputState, setInputState] = useState<string>(title)

	const handleDelete = (id: Todo['id']) => {
			deleteTodos(id).then(() => {
				setTodos((todo) => todo.filter((p) => p.id != id))
				getTodos(() => fetchTodos(category))
			})
	}
	
	const cardOnChange = (id: Todo['id'], title: Todo['title']) => {
		setIsChecked((state) => (state ? false : true))
		isDoneCheck(!isChecked, id, title)
	}

	const handleEditButton = () => {
		setEditInputValue((val) => (val ? false : true))
	}

	const handleSaveButton = () => {
		setEditInputValue((val) => (val ? false : true))
		const validation = titleValidation(inputState)
		if (validation){ 
			setInputState(title)
			alert(validation)
			return
		}
		const trimedInput = inputState.trim()
		setInputState(trimedInput)
		if (trimedInput === title) return
		handleEdit(id, trimedInput, isDone)
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
					setTodos((todos) =>
						todos.map((todo) =>
							todo.id === id ? { ...todo, title, isDone } : todo
						)
					)
					getTodos(() => fetchTodos(category))
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


	const handleCancelButton = () => {
		setEditInputValue((val) => (val ? false : true))
		setInputState(title)
	}

	return (
		<div className={styles.myCard}>
			<input
				checked={isChecked}
				onChange={() => cardOnChange(id, title)}
				type='checkbox'
				name='check'
			></input>
			<input
				className={styles.myInput}
				disabled={inputEditValue}
				value={inputState}
				onChange={(event) => setInputState(event.target.value)}
			></input>
			<div className={styles.buttonsContainer}>
				{inputEditValue ? (
					<MyButton
						size='medium'
						variant='primary'
						information='success'
						onClick={handleEditButton}
					>
						Редакитровать
					</MyButton>
				) : (
					<>
						<MyButton
							size='medium'
							variant='primary'
							information='success'
							onClick={handleSaveButton}
						>
							Сохранить
						</MyButton>
						<MyButton
							size='medium'
							variant='secondary'
							information='warning'
							onClick={handleCancelButton}
						>
							Отмена
						</MyButton>
					</>
				)}
			</div>
			<MyButton  
			size='medium'
			variant='secondary'
			information='warning'
			onClick={() => handleDelete(id)}>
				Удалить
			</MyButton>
		</div>
	)
}

export default TodoItem
