import { memo, useState } from 'react'
//import { addTodo } from '../../API/API'
import { Button, Flex, Form, Input, type FormProps } from 'antd'
import PostService from '../../API/API'

interface AddTodoProps {
  getTodos: () => Promise<void>
}

type FieldType = {
  addTodo: string
}

const AddTodo = memo(function AddTodo ({ getTodos }: AddTodoProps) {
  const [customError, setCustomError] = useState<string>('')
  const [form] = Form.useForm()
  
  const handleSubmit: FormProps<FieldType>['onFinish'] = async (value) => {
    try {
      const todo = await PostService.addTodo(value.addTodo)
      if (todo) {
        await getTodos()
      }
      setCustomError('')
      form.setFieldsValue({ addTodo: '' })
    } catch (e) {
      setCustomError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        autoComplete='off'
        layout='inline'
      >
        <Form.Item<FieldType>
          name='addTodo'
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              min: 2,
              message: 'Please min 2!',
            },
            { max: 64, message: 'Please max 64!' },
          ]}
          style={{ flex: 1 }}
        >
          <Input
            type='text'
            id='input'
            placeholder='Task To Be Done...'
          ></Input>
        </Form.Item>
        <Form.Item label={null} style={{ marginInlineEnd: '0' }}>
          <Button type='primary' htmlType='submit'>
            add
          </Button>
        </Form.Item>
      </Form>
      {customError && <Flex>{customError}</Flex>}
    </>
  )
})

export default AddTodo
