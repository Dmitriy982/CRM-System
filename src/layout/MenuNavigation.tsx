import { HomeOutlined, ProfileOutlined } from '@ant-design/icons'
import { Layout, Menu, type MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { Link, Outlet, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function MenuNavigation() {
  const location = useLocation()
  const items: MenuItem[] = [
    { key: '/', label: <Link to='/'>Главная</Link>, icon: <HomeOutlined /> },
    {
      key: '/profile',
      label: <Link to='/profile'>Профиль</Link>,
      icon: <ProfileOutlined />,
    },
  ]
  return (
    <Layout>
      <Sider>
        <Menu
          theme='dark'
          mode='vertical'
          items={items}
          selectedKeys={[location.pathname]}
        ></Menu>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default MenuNavigation
