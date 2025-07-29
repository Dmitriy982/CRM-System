import { useState, type Dispatch, type SetStateAction } from 'react'
import { addTodo, fetchTodos } from '../../API/API'
import MyButton from '../../UI/MyButton'
import titleValidation from '../../Validation/validation'
import styles from './Add-Todo.module.scss'
import type { CategorySelecor, MetaResponse, Todo, TodoInfo } from '../../types/types'

interface AddTodoProps {
	setTodos: Dispatch<SetStateAction<Todo[]>>
	category: CategorySelecor
	getTodos: (callback: () => Promise<MetaResponse<Todo, TodoInfo> | undefined>) => Promise<void>
}

function AddTodo({category, getTodos, setTodos}: AddTodoProps) {
	const [customError, setCustomError] = useState<string>('')
	const [addToDoInput, setAddToDoInput] = useState<Todo['title']>('')
	const handleSubmit = () => {
		const validation = titleValidation(addToDoInput)
		if (validation) {
			alert(validation)
			return
		}
		const trimedInput = addToDoInput.trim()
		addTodo(trimedInput).then((todo) => {
			if (todo) {
				setTodos((todos) => [ ...todos, todo])
				getTodos(() => fetchTodos(category))
			}
		setCustomError('')
		}
		).catch((e) =>
			setCustomError(e.toString())
		)
		setAddToDoInput('')
	}

	return (
		<div className={styles.myHeader}>
			{customError && <div>{customError}</div>}
			<input
				type='text'
				id='input'
				value={addToDoInput}
				onChange={(event) => setAddToDoInput(event.target.value)}
				placeholder='Task To Be Done...'
				style={{ width: '100%' }}
				className={styles.myInput}
			></input>
			<MyButton size='large' variant='primary' information='success' onClick={handleSubmit}>
				add
			</MyButton>
		</div>
	)
}

export default AddTodo
