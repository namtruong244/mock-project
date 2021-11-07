import { Redirect, Route, Switch } from 'react-router-dom'
import { MainLayout } from '../../_kyn/components'

export function PrivateRoutes() {
  // const ProductPage = lazy(() => import('../features/product/pages/ProductPage'))

  return (
    // <Suspense fallback={<FallbackView />}>
    <MainLayout>
      <Switch>
        <Route path='/dashboard'>
          <p>Dashboard</p>
        </Route>
        {/*<Route path='/products' component={<p>Product</p>} />*/}
        {/*<Route path='/crafted/pages/profile' component={ProfilePage} />*/}
        {/*<Route path='/crafted/pages/wizards' component={WizardsPage} />*/}
        {/*<Route path='/crafted/widgets' component={WidgetsPage} />*/}
        {/*<Route path='/crafted/account' component={AccountPage} />*/}
        {/*<Route path='/apps/chat' component={ChatPage} />*/}
        {/*<Route path='/menu-test' component={MenuTestPage} />*/}
        <Redirect from='/login' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </MainLayout>
    // </Suspense>

  )
}