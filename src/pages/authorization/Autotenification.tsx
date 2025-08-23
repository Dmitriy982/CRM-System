import { Button, Flex, Form, Input, Typography, type FormProps } from 'antd'
import type { AuthData } from '../../types/auth-types/authType'
import { LoginLength, PasswordLength } from '../../constans/todo'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authUser } from '../../services/reducers/UserSlice'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

type FieldType = AuthData

function Autotenification() {
  const dispatch = useAppDispatch()
  const { isAuth, autError } = useAppSelector((state) => state.userReducer)
  const { Text } = Typography

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (value) => {
    const userData: AuthData = {
      login: value.login,
      password: value.password,
    }
    dispatch(authUser(userData))
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Form
      name='autotenification'
      onFinish={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
      layout='vertical'
      requiredMark={false}
    >
      {autError && (
        <Flex justify='center'>
          <Text type='danger'>Wrong login or password!</Text>
        </Flex>
      )}
      <Form.Item<FieldType>
        name='login'
        label='login'
        rules={[
          { required: true, message: 'Please input your login!' },
          {
            min: LoginLength.minLength,
            message: `Please min ${LoginLength.minLength}!`,
          },
          {
            max: LoginLength.maxLength,
            message: `Please max ${LoginLength.maxLength}!`,
          },
        ]}
        style={{ flex: 1 }}
      >
        <Input type='text' id='_input' placeholder='Login'></Input>
      </Form.Item>

      <Form.Item<FieldType>
        name='password'
        label='password'
        rules={[
          { required: true, message: 'Please input your password!' },
          {
            min: PasswordLength.minLength,
            message: `Please min ${PasswordLength.minLength}!`,
          },
          {
            max: PasswordLength.maxLength,
            message: `Please max ${PasswordLength.maxLength}!`,
          },
        ]}
        style={{ flex: 1 }}
      >
        <Input.Password
          type='text'
          id='input'
          placeholder='username'
        ></Input.Password>
      </Form.Item>
      <Flex justify='center' flex={1}>
        <Form.Item label={null} style={{ marginInlineEnd: '0' }}>
          <Button type='primary' htmlType='submit' size='large'>
            LogIn
          </Button>
        </Form.Item>
      </Flex>
      <Flex justify='center'>
        <Typography>
          Not Registred Yet? <Link to='signup'>Create an account</Link>
        </Typography>
      </Flex>
    </Form>
  )
}

export default Autotenification
