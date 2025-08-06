import { Flex } from 'antd'
import type { Todo } from '../../types/types'
import TodoItem from '../todo-item/TodoItem'

interface TodoLostProps {
  todos: Todo[]
  getTodos: () => Promise<void>
}

function TodoList({ getTodos, todos }: TodoLostProps) {
  return (
    <Flex vertical>
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
    </Flex>
  )
}

export default TodoList
