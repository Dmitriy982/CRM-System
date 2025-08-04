import { useState, type ReactElement } from 'react'
import type { Todo } from '../../types/types'
import MyButton from '../../UI/MyButton'
import styles from './TodoItem.module.scss'
import validateTitle from '../../Validation/validate-title'
import { deleteTodos, editTodos } from '../../API/API'

interface TodoItemProps extends Omit<Todo, 'created'> {
  getTodos: () => Promise<void>
}

function TodoItem({
  getTodos,
  id,
  title,
  isDone,
}: TodoItemProps): ReactElement {
  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [inputState, setInputState] = useState<string>(title)
  const [customError, setCustomError] = useState<string>('')

  const handleDelete = async (id: Todo['id']) => {
    try {
      await deleteTodos(id)
      await getTodos()
      setCustomError('')
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    }
  }

  const checkboxStatusChange = async (
    id: Todo['id'],
    isDone: Todo['isDone']
  ) => {
    try {
      await editTodos(
        {
          isDone: !isDone,
        },
        id
      )
      await getTodos()
      setCustomError('')
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    }
  }

  const handleStartEdit = () => {
    setIsEdit(false)
  }

  const handleEndEdit = () => {
    setIsEdit(true)
  }

  const handleSubmitButton = async (id: Todo['id'], title: Todo['title']) => {
    const validation = validateTitle(inputState)
    if (validation) {
      alert(validation)
      return
    }
    if (inputState === title) {
      return
    }
    try {
      await editTodos(
        {
          title: inputState,
        },
        id
      )
      await getTodos()
      setCustomError('')
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    } finally {
      handleEndEdit()
    }
  }

  const handleCancelButton = () => {
    setInputState(title)
    handleEndEdit()
  }

  return (
    <div className={styles.myCard}>
      {customError && <div>{customError}</div>}
      <input
        checked={isDone}
        onChange={() => checkboxStatusChange(id, isDone)}
        type='checkbox'
        name='check'
      ></input>
      <input
        className={styles.myInput}
        disabled={isEdit}
        value={inputState}
        onChange={(event) => setInputState(event.target.value)}
      ></input>
      <div className={styles.buttonsContainer}>
        {isEdit ? (
          <MyButton size='medium' variant='primary' onClick={handleStartEdit}>
            Редакитровать
          </MyButton>
        ) : (
          <div className={styles.saveCancelContainer}>
            <MyButton
              size='medium'
              variant='success'
              onClick={() => handleSubmitButton(id, title)}
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
