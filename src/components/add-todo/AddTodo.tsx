import { useState } from 'react'
import { addTodo } from '../../API/API'
import MyButton from '../../UI/MyButton'
import validateTitle from '../../Validation/validate-title'
import styles from './AddTodo.module.scss'
import type { Todo } from '../../types/types'

interface AddTodoProps {
  getTodos: () => Promise<void>
}

function AddTodo({ getTodos }: AddTodoProps) {
  const [customError, setCustomError] = useState<string>('')
  const [addToDoInput, setAddToDoInput] = useState<Todo['title']>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validation = validateTitle(addToDoInput)
    if (validation) {
      alert(validation)
      return
    }
    try {
      const todo = await addTodo(addToDoInput)
      if (todo) {
        await getTodos()
      }
      setCustomError('')
      setAddToDoInput('')
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.myHeader}>
      {customError && <div>{customError}</div>}
      <input
        type='text'
        id='input'
        value={addToDoInput}
        onChange={(event) => setAddToDoInput(event.target.value)}
        placeholder='Task To Be Done...'
        className={styles.myInput}
      ></input>
      <MyButton type='submit' size='large' variant='primary'>
        add
      </MyButton>
    </form>
  )
}

export default AddTodo
