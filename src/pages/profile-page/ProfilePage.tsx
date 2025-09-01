import { Button, Flex, Typography } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { useEffect } from 'react'
import { getUser, logout, resetIsAuth } from '../../services/slices/userSlice'
import { useSelector } from 'react-redux'
import {
  selectLogout,
  selectUser,
  selectUserStore,
} from '../../services/selectors/userSelectors'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { Text } = Typography
  const { isAuth } = useSelector(selectUserStore)
  const { status } = useSelector(selectLogout)
  const { data: user } = useSelector(selectUser)

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser())
    }
  }, [isAuth])

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (status.isLoaded) {
      dispatch(resetIsAuth())
    }
  }, [status])

  return (
    <Flex vertical align='center' gap='large'>
      <Text>Username: {user && user.username}</Text>
      <Text>Email: {user && user.email}</Text>
      <Text>Phone number: {user && user.phoneNumber}</Text>
      <Button onClick={handleLogout} type='primary' size='large'>
        LogOut
      </Button>
    </Flex>
  )
}

export default ProfilePage
