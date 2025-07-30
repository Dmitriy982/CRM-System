import TodoList from '../../components/todo-list/Todo-List'
import styles from './Todo-List-Page.module.scss'

function TodoListPage() {
  return (
    <div className={styles.toDoListPage}>
      <TodoList></TodoList>
    </div>
  )
}

export default TodoListPage
