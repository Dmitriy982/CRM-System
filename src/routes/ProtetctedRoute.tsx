import { type ReactNode } from 'react'
import { useAppSelector } from '../hooks/redux'
import { Navigate } from 'react-router-dom'

interface ProtectedRoute {
  children: ReactNode
}

function ProtetctedRoute({ children }: ProtectedRoute) {
  const { isAuth } = useAppSelector((state) => state.userReducer)
  if (!isAuth) {
    return <Navigate to='/login' />
  }
  return children
}

export default ProtetctedRoute
