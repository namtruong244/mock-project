import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../features/auth'
import { PrivateRoutes } from './PrivateRoutes'
import { useSelector } from 'react-redux'
import { PublicRoutes } from './PublicRoutes'

export function Routes() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn)

  return (
    <Switch>
      <PublicRoutes />
    </Switch>
  )
}
