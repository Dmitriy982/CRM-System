import { AndroidOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <Flex vertical align='center'>
      <AndroidOutlined style={{ fontSize: '8rem' }} />
      <Flex style={{ fontSize: '3rem' }}>Error 404</Flex>
      <Link to='/'>Вернуться к todo</Link>
    </Flex>
  )
}

export default ErrorPage
