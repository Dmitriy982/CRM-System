import { Outlet } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'

function Authorization() {
  return (
    <Content style={{ minHeight: '100vh', alignContent: 'center' }}>
      <Outlet />
    </Content>
  )
}

export default Authorization
