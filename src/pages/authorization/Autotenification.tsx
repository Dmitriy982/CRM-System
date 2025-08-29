import { Button, Flex, Form, Input, Skeleton, Typography, type FormProps } from 'antd'
import type { AuthData } from '../../types/auth-types/authType'
import { LoginLength, PasswordLength } from '../../constans/authReg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../modules/selectors/userSelectors'
import { authUser, setIsAuth } from '../../modules/slices/userSlice'

type FieldType = AuthData

function Autotenification() {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector((state) => state.userReducer)
  const {error, status} = useSelector(selectLogin)
  const { Text } = Typography

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (value) => {
    const userData: AuthData = {
      login: value.login,
      password: value.password,
    }
    try {
      await dispatch(authUser(userData)).unwrap()
      dispatch(setIsAuth())
    } catch (e) {
        //console.log(e)
        // После бестпрактис по финтеху, "всю логику делаем в компонентах". У меня
        // должен был сократится код. Но теперь нужно менять "кастомные" состояния тут, вместо 
        // fullfilled и тд в extrareducers. Но мне же их нужно обрабатывать в try catch и получается
        // что я дублирую try catch, т.к. он и в thunk и тут. В чем тогда сокращение кода
        // или может я неправильно что-то понял или делаю? 
        // И если мне дублироовать try catch, что мне писать в catch и там и там, 
        // чтобы не дублировать код?
    }
  }

  if(status.isLoading) {
    return <Skeleton/>
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
        <Input.Password
          type='text'
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
