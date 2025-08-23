import { type ReactNode } from 'react'
import { useAppSelector } from '../hooks/redux'
import { Navigate} from 'react-router-dom'

interface ProtectedRoute {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRoute) {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.userReducer)

   if (!isAuth && isAuthChecked) {
    return <Navigate to='/login' replace/>
  }
  return children
}

export default ProtectedRoute
