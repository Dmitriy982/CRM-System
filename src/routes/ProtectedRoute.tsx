import { useEffect, type ReactNode } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { Navigate } from 'react-router-dom'
import {
  checkAuth,
  setIsAuth,
  setIsAuthChecked,
} from '../services/slices/userSlice'
import { useSelector } from 'react-redux'
import {
  selectCheckAuth,
  selectUserStore,
} from '../services/selectors/userSelectors'

interface ProtectedRoute {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRoute) {
  const { isAuth, isAuthChecked } = useSelector(selectUserStore)
  const { status } = useSelector(selectCheckAuth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  useEffect(() => {
    if (status.isLoadedOrError) {
      dispatch(setIsAuthChecked(true))
      // этот флаг у меня ставится дабы избежать баг, что
      // меня на секунду кидает на /login, и из-за этого два раза срабатывает
      // useeffect и еще перекидвает с /profile на /,
      // так как успевает отработать navigate to / в /login
    }

    if (status.isLoaded) {
      dispatch(setIsAuth())
    }
  }, [status])

  if (!isAuth && isAuthChecked) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
