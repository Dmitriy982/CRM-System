import { useEffect, useState } from 'react'
import styles from './TodoListPage.module.scss'
import { fetchTodos } from '../../API/API'
import type { CategorySelector, Todo, TodoInfo } from '../../types/types'
import TodoTabsFilter from '../../components/todo-tabs-filter/TodoTabsFilter'
import AddTodo from '../../components/add-todo/AddTodo'
import TodoList from '../../components/todo-list/TodoList'
import  { Skeleton } from 'antd'



function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [category, setCategory] = useState<CategorySelector>('all')
  const [amount, setAmount] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    setIsLoading(true)
    setTimeout(()=> {
      setIsLoading(false)
      getTodos()
    }, 1000)
    const timer = setInterval(()=>{
      getTodos()
    }, 5000)
    return () => clearInterval(timer)
  }, [category])

  return (
    <div className={styles.toDoListPage}>
      <AddTodo getTodos={getTodos} />
      <TodoTabsFilter
        category={category}
        amount={amount}
        setCategory={setCategory}
      />
      
      {isLoading 
      ?<Skeleton paragraph={{ rows: 4 }} /> 
      :<TodoList getTodos={getTodos} todos={todos}/>}
    </div>
  )
}

export default TodoListPage
