import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/todo-list-page/TodoListPage'
import ErrorPage from './pages/error-page/ErrorPage'
import MenuNavigation from './pages/menu-navigation/MenuNavigation'
import ProfilePage from './pages/profile-page/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MenuNavigation />}>
        <Route index element={<TodoListPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
