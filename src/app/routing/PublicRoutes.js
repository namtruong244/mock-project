import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../features/auth'

export function PublicRoutes() {
  return (
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Redirect to='/login' />
    </Switch>
  )
}