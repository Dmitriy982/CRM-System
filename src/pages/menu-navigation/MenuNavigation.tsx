import { HomeOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu, type MenuProps } from 'antd'
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
    <>
      <Menu
        mode='vertical'
        items={items}
        selectedKeys={[location.pathname]}
      ></Menu>
      <Outlet />
    </>
  )
}

export default MenuNavigation
