import { useEffect, useState } from 'react'
import styles from './Todo-List.module.scss'
import { fetchTodos } from '../../API/API'
import type { CategorySelector, Todo, TodoInfo } from '../../types/types'
import TodoItem from '../todo-item/Todo-Item'
import TodoTabsFilter from '../todo-tabs-filter/Todo-Tabs-Filter'
import AddTodo from '../add-todo/Add-Todo'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [category, setCategory] = useState<CategorySelector>('all')
  const [amount, setAmount] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  })

  const getTodos = async (category: CategorySelector) => {
    const data = await fetchTodos(category)
    if (data) {
      setTodos(data.data)
    }
    if (data?.info) {
      setAmount(data.info)
    }
  }

  useEffect(() => {
    getTodos(category)
  }, [])

  return (
    <div className={styles.myForm}>
      <AddTodo category={category} getTodos={getTodos} />
      <TodoTabsFilter
        amount={amount}
        category={category}
        getTodos={getTodos}
        setCategory={setCategory}
      />
      <div className={styles.myForm}>
        {todos ? (
          todos.map((todo) => (
            <TodoItem
              category={category}
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
    </div>
  )
}

export default TodoList
