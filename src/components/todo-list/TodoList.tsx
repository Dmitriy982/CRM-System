import type { Todo } from '../../types/types'
import TodoItem from '../todo-item/TodoItem'
import styles from './TodoList.module.scss'

interface TodoLostProps {
  todos: Todo[]
  getTodos: () => Promise<void>
}

function TodoList({ getTodos, todos }: TodoLostProps) {
  return (
    <div className={styles.todosList}>
      {todos ? (
        todos.map((todo) => (
          <TodoItem
            getTodos={getTodos}
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
  )
}

export default TodoList
