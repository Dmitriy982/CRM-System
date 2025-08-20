import { Button, Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUser, logout, resetIsAuth } from '../../services/reducers/UserSlice'
import { useEffect } from 'react'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const {isAuth} = useAppSelector(state => state.userReducer)
  const { Text } = Typography
  useEffect(() => {
    dispatch(getUser())
  }, [])
  const handleLogout = () => {
    {dispatch(logout())}
  }
  const { user } = useAppSelector((state) => state.userReducer)
  return (
    <Flex vertical align='center' gap='large'>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Id: {user.id}</Text>
      <Text>Phone number: {user.phoneNumber}</Text>
      <Text>Role: {user.roles}</Text>
      <Button
      onClick={handleLogout}
      type='primary'
      size='large'
      >LogOut</Button>
    </Flex>
  )
}

export default ProfilePage
