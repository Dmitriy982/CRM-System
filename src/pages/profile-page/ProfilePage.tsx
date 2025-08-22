import { Button, Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUser, logout} from '../../services/reducers/UserSlice'
import { useEffect } from 'react'

function ProfilePage() {
  const dispatch = useAppDispatch()
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
      <Text>Phone number: {user.phoneNumber}</Text>
      <Button
      onClick={handleLogout}
      type='primary'
      size='large'
      >LogOut</Button>
    </Flex>
  )
}

export default ProfilePage
