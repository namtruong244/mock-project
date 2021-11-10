import { Route, Switch } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../features/auth'
import { MainLayout } from '../../_kyn/components'
import { ProfilePage } from '../features/user'
import { ProductList } from '../features/products/'
import { ViewOrder } from '../features/products/'
import { OrderDetail } from '../features/products/'
import { CardConfig } from '../features/products/'
import { StoreList } from '../features/products/'
import { StoreDetail } from '../features/products/'
import { ProductUpdate } from '../features/products/'
import { ProductDetail } from '../features/products/'

export function PublicRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <MainLayout>
        <Route path="/profile/:userId" component={ProfilePage} />
        <Route path="/list-order" component={ViewOrder} />
        <Route path="/detail-order" component={OrderDetail} />
        <Route path="/list-store" component={StoreList} />
        <Route path="/store-detail" component={StoreDetail} />
        <Route path="/product-update" component={ProductUpdate} />
        <Route path="/product-detail" component={ProductDetail} />
        <Route path="/" exact>
          <p>Products</p>
        </Route>
      </MainLayout>
      {/* <Redirect to="/login" /> */}
    </Switch>
  )
}
