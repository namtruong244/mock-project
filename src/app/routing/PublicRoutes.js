import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../features/auth'
import { Register } from '../features/auth'

export function PublicRoutes() {
  return (
    <Switch>
      {/* <Route path="/login" component={LoginPage} /> */}
      <Route path="/register" component={Register} />
      {/* <Redirect to="/login" /> */}
    </Switch>
  )
}
