import { Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUser } from '../../services/reducers/UserSlice'
import { useEffect } from 'react'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { Text } = Typography
  useEffect(() => {
    dispatch(getUser())
  }, [])
  const { user } = useAppSelector((state) => state.userReducer)
  return (
    <Flex vertical align='center'>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Id: {user.id}</Text>
      <Text>Phone number: {user.phoneNumber}</Text>
      <Text>Role: {user.roles}</Text>
    </Flex>
  )
}

export default ProfilePage
