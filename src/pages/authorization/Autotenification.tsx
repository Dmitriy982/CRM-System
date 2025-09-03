import {
  Button,
  Flex,
  Form,
  Input,
  Skeleton,
  Typography,
  type FormProps,
} from 'antd'
import type { AuthData } from '../../types/auth-types/authType'
import { LoginLength, PasswordLength } from '../../constans/authReg'
import { useAppDispatch } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectLogin,
  selectUserStore,
} from '../../services/selectors/userSelectors'
import { authUser, setIsAuth } from '../../services/slices/userSlice'
import { useEffect } from 'react'

type FieldType = AuthData

function Autotenification() {
  const dispatch = useAppDispatch()
  const { isAuth } = useSelector(selectUserStore)
  const { error, status } = useSelector(selectLogin)
  const { Text } = Typography

  useEffect(() => {
    if (status.isLoaded) {
      dispatch(setIsAuth())
    }
  }, [status])

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (value) => {
    const userData: AuthData = {
      login: value.login,
      password: value.password,
    }
    dispatch(authUser(userData))
  }

  if (status.isLoading) {
    return <Skeleton />
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
      {error && (
        <Flex justify='center'>
          <Text type='danger'>{error as string}</Text>
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
        <Input type='text' placeholder='Login'></Input>
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
        <Input.Password type='text' placeholder='username'></Input.Password>
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
