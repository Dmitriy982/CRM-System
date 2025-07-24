import { useState, type ReactElement } from 'react'
import type { Todo } from '../../API/types'
import MyButton from '../../UI/MyButton'
import styles from './Post-card.module.scss'

interface IPostCard extends Omit<Todo, 'created'> {
	onDelete: () => void
	onEdit: (id: Todo['id'], title: string | null, isDone: Todo['isDone']) => void
	onIsDone: (isDone: boolean, id: Todo['id'], title: Todo['title']) => void
}

function PostCard({
	title,
	onDelete,
	isDone,
	id,
	onIsDone,
	onEdit,
}: IPostCard): ReactElement {
	const [isChecked, setIsChecked] = useState<boolean>(isDone)
	const [inputEditValue, setEditInputValue] = useState<boolean>(true)
	const [inputState, setInputState] = useState<string>(title)
	const cardOnChange = (id: Todo['id'], title: Todo['title']) => {
		setIsChecked((state) => (state ? false : true))
		onIsDone(!isChecked, id, title)
	}
	const handleEditButton = () => {
		setEditInputValue((val) => (val ? false : true))
		if (inputState === title) return
		onEdit(id, inputState, isDone)
	}

	const handleCancelButton = () => {
		setEditInputValue((val) => (val ? false : true))
		setInputState((val) => (val = title))
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
						height='100%'
						width='120px'
						color='blue'
						onClick={handleEditButton}
					>
						Редакитровать
					</MyButton>
				) : (
					<>
						<MyButton
							height='100%'
							width='60px'
							color='green'
							onClick={handleEditButton}
						>
							Сохранить
						</MyButton>
						<MyButton
							height='100%'
							width='60px'
							color='red'
							onClick={handleCancelButton}
						>
							Отмена
						</MyButton>
					</>
				)}
			</div>
			<MyButton height='100%' width='120px' onClick={onDelete} color='red'>
				Удалить
			</MyButton>
		</div>
	)
}

export default PostCard
