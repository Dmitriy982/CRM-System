import { Button, Flex, Form, Input, Typography, type FormProps } from 'antd'
import type { UserRegistration } from '../../types/auth-types/authType'
import {
  LoginLength,
  PasswordLength,
  UsernameLength,
} from '../../constans/todo'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { registerUser } from '../../services/reducers/UserSlice'
import { Link } from 'react-router-dom'

interface repeatPassword {
  repeatPassword: string
}

type FieldType = UserRegistration & repeatPassword

function Registration() {
  const dispatch = useAppDispatch()
  const { isRegister, regError } = useAppSelector((state) => state.userReducer)
  const [form] = Form.useForm()
  const { Text } = Typography

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (value) => {
    if (value.password !== value.repeatPassword) {
      form.setFields([
        {
          name: 'repeatPassword',
          errors: ['Passwords do not match!'],
        },
      ])
      return
    }
    const userData: UserRegistration = {
      email: value.email,
      login: value.login,
      password: value.password,
      phoneNumber: value.phoneNumber || '',
      username: value.username,
    }
    dispatch(registerUser(userData))
  }

  return (
    <Form
      name='registration'
      onFinish={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
      layout='vertical'
      requiredMark={false}
      form={form}
    >
      {regError && (
        <Flex justify='center'>
          <Text type='danger'>{regError}</Text>
        </Flex>
      )}
      {isRegister && (
        <Flex justify='center' vertical align='center'>
          <Text type='success'>Registration is Successful!</Text>
          <Link to='/login'>Link To Authorization</Link>
        </Flex>
      )}
      <Form.Item<FieldType>
        name='username'
        label='username'
        rules={[
          { required: true, message: 'Please input your username!' },
          {
            min: UsernameLength.minLength,
            message: `Please min ${UsernameLength.minLength}!`,
          },
          {
            max: UsernameLength.maxLength,
            message: `Please max ${UsernameLength.maxLength}!`,
          },
          { pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/, message: 'Letters only!' },
        ]}
        style={{ flex: 1 }}
      >
        <Input type='text' id='input' placeholder='username'></Input>
      </Form.Item>

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
          { pattern: /^[a-zA-z]+$/, message: 'Latins letters only!' },
        ]}
        style={{ flex: 1 }}
      >
        <Input type='text' id='input' placeholder='Login'></Input>
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
          placeholder='password'
          onChange={() => form.validateFields(['repeatPassword'])}
        ></Input.Password>
      </Form.Item>

      <Form.Item<FieldType>
        name='repeatPassword'
        label='repeat password'
        rules={[
          { required: true, message: 'Please repeat your password!' },
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
          placeholder='repeatPassword'
          onChange={() => form.validateFields(['password'])}
        ></Input.Password>
      </Form.Item>

      <Form.Item<FieldType>
        name='email'
        label='email'
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email' },
        ]}
        style={{ flex: 1 }}
      >
        <Input type='text' id='input' placeholder='email'></Input>
      </Form.Item>

      <Form.Item<FieldType>
        name='phoneNumber'
        label='phoneNumber'
        rules={[
          {
            pattern: /\+7\d{10}$/,
            message: 'Please input your number with +7!',
          },
        ]}
        style={{ flex: 1 }}
      >
        <Input type='text' id='input' placeholder='phoneNumber'></Input>
      </Form.Item>
      <Flex justify='center'>
        <Form.Item label={null} style={{ marginInlineEnd: '0' }}>
          <Button type='primary' htmlType='submit' size='large'>
            Signup
          </Button>
        </Form.Item>
      </Flex>
      <Flex justify='center'>
        <Text>
          <Link to='/login'>Back To Autotenification</Link>
        </Text>
      </Flex>
    </Form>
  )
}

export default Registration
