import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/todo-list-page/TodoListPage'
import ErrorPage from './pages/error-page/ErrorPage'
import MenuNavigation from './layout/MenuNavigation'
import ProfilePage from './pages/profile-page/ProfilePage'
import Registration from './pages/registration/Registration'
import Authorization from './layout/Authorization'
import Autotenification from './pages/authorization/registrarion/Autotenification'
import ProtetctedRoute from './routes/ProtetctedRoute'
import { useAppDispatch } from './hooks/redux'
import { useEffect } from 'react'
import { checkAuth } from './services/reducers/UserSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(localStorage.getItem('tokenRef')) {
      dispatch(checkAuth())
    } 
  })
  return (
    <Routes>
      <Route path='/login' element={<Authorization />}>
        <Route index element={<Autotenification />} />
        <Route path='signup' element={<Registration />} />
      </Route>
      <Route
        path='/'
        element={
          <ProtetctedRoute>
            <MenuNavigation />
          </ProtetctedRoute>
        }
      >
        <Route index element={<TodoListPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
