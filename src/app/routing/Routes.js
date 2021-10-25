import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../features/auth'
import { PrivateRoutes } from './PrivateRoutes'
import { useSelector } from 'react-redux'
import { PublicRoutes } from './PublicRoutes'

export function Routes() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn)

  return (
    <Switch>
      {!isLoggedIn ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <PublicRoutes/>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from='/login' to='/' />
      )}

      {/*<Route path='/error' component={ErrorsPage} />*/}
      {/*<Route path='/logout' component={Logout} />*/}

      {!isLoggedIn ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to='/login' />
      ) : (
          <PrivateRoutes />
      )}
    </Switch>
  )

}