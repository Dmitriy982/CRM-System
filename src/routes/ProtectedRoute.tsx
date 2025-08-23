import { type ReactNode } from 'react'
import { useAppSelector } from '../hooks/redux'
import { Navigate} from 'react-router-dom'
import { Skeleton } from 'antd'

interface ProtectedRoute {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRoute) {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.userReducer)

  if (!isAuthChecked) {
    return <Skeleton/>
  }

  if (!isAuth && isAuthChecked) {
    return <Navigate to='/login' replace/>
  }
  return children
}

export default ProtectedRoute
