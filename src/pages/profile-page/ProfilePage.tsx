import { Button, Flex, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'
import { getUser, logout, resetIsAuth } from '../../modules/slices/userSlice'
import { useSelector } from 'react-redux'
import { selectUser } from '../../modules/selectors/userSelectors'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { Text } = Typography
  const {isAuth} = useAppSelector(state => state.userReducer)

  useEffect(() => {  
    if (isAuth) {
      dispatch(getUser())
    }      
  }, [isAuth])

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      dispatch(resetIsAuth())
    } catch (e) {
      console.log(e)
    }
  }
  const {data: user} = useSelector(selectUser)
  return (
    <Flex vertical align='center' gap='large'>
      <Text>Username: {user && user.username}</Text>
      <Text>Email: {user && user.email}</Text>
      <Text>Phone number: {user && user.phoneNumber}</Text>
      <Button
      onClick={handleLogout}
      type='primary'
      size='large'
      >LogOut</Button>
    </Flex>
  )
}

export default ProfilePage
