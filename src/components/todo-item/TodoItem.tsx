import { useState, type ReactElement } from 'react'
import type { Todo } from '../../types/types'
import { deleteTodos, editTodos } from '../../API/API'
import { Button, Checkbox, Flex, Form, Input, type FormProps } from 'antd'

interface TodoItemProps extends Omit<Todo, 'created'> {
  getTodos: () => Promise<void>
}

type FieldType = {
  todo: string
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
  const [form] = Form.useForm()

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

  const handleSubmitButton: FormProps<FieldType>['onFinish'] = async (
    values
  ) => {
    if (values.todo === title) {
      handleEndEdit()
      return
    }
    try {
      await editTodos(
        {
          title: values.todo,
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
    <Flex
      justify='space-between'
      align='center'
      style={{ marginBottom: '20px' }}
    >
      {customError && <Flex>{customError}</Flex>}
      <Checkbox
        checked={isDone}
        onChange={() => checkboxStatusChange(id, isDone)}
      ></Checkbox>
      <Form
        form={form}
        initialValues={{ todo: inputState }}
        onFinish={handleSubmitButton}
        autoComplete='off'
        style={{ alignItems: 'center' }}
      >
        <Flex gap='middle' align='center'>
          <Form.Item<FieldType>
            name='todo'
            rules={[
              { required: true, message: 'Please input your todo!' },
              {
                min: 2,
                message: 'Please min 2 symbols!',
              },
              { max: 64, message: 'Please max 64 symbols!' },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              disabled={isEdit}
              value={inputState}
              style={{ width: '100%' }}
            ></Input>
          </Form.Item>
          {isEdit ? (
            <Button type='primary' htmlType='button' onClick={handleStartEdit}>
              Редакитровать
            </Button>
          ) : (
            <Flex gap='small'>
              <Button type='primary' htmlType='submit'>
                Сохранить
              </Button>
              <Button
                type='default'
                htmlType='button'
                onClick={handleCancelButton}
              >
                Отмена
              </Button>
            </Flex>
          )}
          <Button
            type='primary'
            danger
            htmlType='button'
            onClick={() => handleDelete(id)}
          >
            Удалить
          </Button>
        </Flex>
      </Form>
    </Flex>
  )
}

export default TodoItem
