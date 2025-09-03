import { useCallback, useEffect, useState } from 'react'
import type {
  CategorySelector,
  Todo,
  TodoInfo,
} from '../../types/todos-types/todosTypes'
import TodoTabsFilter from '../../components/todo-tabs-filter/TodoTabsFilter'
import AddTodo from '../../components/add-todo/AddTodo'
import TodoList from '../../components/todo-list/TodoList'
import { fetchTodos } from '../../API/API'

function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [category, setCategory] = useState<CategorySelector>('all')
  const [amount, setAmount] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  })

  const getTodos = useCallback(async () => {
    const data = await fetchTodos(category)
    if (data) {
      setTodos(data.data)
    }
    if (data?.info) {
      setAmount(data.info)
    }
  }, [category])

  useEffect(() => {
    getTodos()
    const timer = setInterval(() => {
      getTodos()
    }, 5000)
    return () => clearInterval(timer)
  }, [category])

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
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
