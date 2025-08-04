import { useEffect, useState } from 'react'
import styles from './TodoListPage.module.scss'
import { fetchTodos } from '../../API/API'
import type { CategorySelector, Todo, TodoInfo } from '../../types/types'
import TodoTabsFilter from '../../components/todo-tabs-filter/TodoTabsFilter'
import AddTodo from '../../components/add-todo/AddTodo'
import TodoList from '../../components/todo-list/TodoList'

function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [category, setCategory] = useState<CategorySelector>('all')
  const [amount, setAmount] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  })

  const getTodos = async () => {
    const data = await fetchTodos(category)
    if (data) {
      setTodos(data.data)
    }
    if (data?.info) {
      setAmount(data.info)
    }
  }

  useEffect(() => {
    getTodos()
  }, [category])

  return (
    <div className={styles.toDoListPage}>
      <AddTodo getTodos={getTodos} />
      <TodoTabsFilter
        category={category}
        amount={amount}
        setCategory={setCategory}
      />
      <TodoList getTodos={getTodos} todos={todos} />
    </div>
  )
}

export default TodoListPage
