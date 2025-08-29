import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/todo-list-page/TodoListPage'
import ErrorPage from './pages/error-page/ErrorPage'
import MenuNavigation from './layout/MenuNavigation'
import ProfilePage from './pages/profile-page/ProfilePage'
import Registration from './pages/registration/Registration'
import Authorization from './layout/Authorization'
import Autotenification from './pages/authorization/Autotenification'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAppDispatch } from './hooks/redux'
import { useEffect } from 'react'
import {
  checkAuth,
  setIsAuth,
  setIsAuthChecked,
} from './modules/slices/userSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const refetchData = async () => {
      try {
        await dispatch(checkAuth()).unwrap()
        dispatch(setIsAuth())
      } catch (e) {
        //console.log(e)
      } finally {
        dispatch(setIsAuthChecked(true))
      }
    }
    refetchData()
  }, [])
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            {' '}
            <MenuNavigation />{' '}
          </ProtectedRoute>
        }
      >
        <Route index element={<TodoListPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
      <Route path='/login' element={<Authorization />}>
        <Route index element={<Autotenification />} />
        <Route path='signup' element={<Registration />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
