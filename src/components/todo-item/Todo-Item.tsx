import { useState, type ReactElement } from 'react'
import type { CategorySelector, Todo } from '../../types/types'
import MyButton from '../../UI/MyButton'
import styles from './Todo-Item.module.scss'
import validateTitle from '../../Validation/validate-title'
import { deleteTodos, editTodos } from '../../API/API'

interface TodoItemProps extends Omit<Todo, 'created'> {
  getTodos: (category: CategorySelector) => void
  category: CategorySelector
}

function TodoItem({
  getTodos,
  category,
  id,
  title,
  isDone,
}: TodoItemProps): ReactElement {
  const [isChecked, setIsChecked] = useState<boolean>(isDone)
  const [inputEditValue, setEditInputValue] = useState<boolean>(true)
  const [inputState, setInputState] = useState<string>(title)
  const [customError, setCustomError] = useState<string>('')

  const handleDelete = async (id: Todo['id']) => {
    try {
      await deleteTodos(id)
      getTodos(category)
      setCustomError('')
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    }
  }

  const cardOnChange = (id: Todo['id'], title: Todo['title']) => {
    setIsChecked((state) => (state ? false : true))
    isDoneCheck(!isChecked, id, title)
  }

  const handleEditButton = () => {
    setEditInputValue((val) => (val ? false : true))
  }

  const handleSaveButton = () => {
    const validation = validateTitle(inputState)
    if (validation) {
      alert(validation)
      return
    }
    setEditInputValue((val) => (val ? false : true))
    const trimedInput = inputState.trim()
    if (trimedInput === title) {
      return
    }
    handleEdit(id, trimedInput, isDone)
  }
  const handleEdit = async (
    id: Todo['id'],
    title: string | null,
    isDone: Todo['isDone']
  ) => {
    if (title) {
      try {
        await editTodos(
          {
            isDone: isDone,
            title: title,
          },
          id
        )
        getTodos(category)
        setCustomError('')
      } catch (e) {
        setCustomError(e instanceof Error ? e.message : String(e))
      }
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
      {customError && <div>{customError}</div>}
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
          <MyButton size='medium' variant='primary' onClick={handleEditButton}>
            Редакитровать
          </MyButton>
        ) : (
          <div className={styles.saveCancelContainer}>
            <MyButton
              size='medium'
              variant='success'
              onClick={handleSaveButton}
            >
              Сохранить
            </MyButton>
            <MyButton
              size='medium'
              variant='secondary'
              onClick={handleCancelButton}
            >
              Отмена
            </MyButton>
          </div>
        )}
      </div>
      <MyButton
        size='medium'
        variant='warning'
        onClick={() => handleDelete(id)}
      >
        Удалить
      </MyButton>
    </div>
  )
}

export default TodoItem
