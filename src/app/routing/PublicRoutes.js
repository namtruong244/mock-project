import { Route, Switch } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../features/auth'
import { MainLayout } from '../../_kyn/components'
import { ProfilePage } from '../features/user'

export function PublicRoutes() {
  return (
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <MainLayout>
        <Route path='/profile/:userId' component={ProfilePage}/>
        <Route path='/' exact>
          <p>Products</p>
        </Route>
      </MainLayout>
      {/* <Redirect to="/login" /> */}
    </Switch>
  )
}
