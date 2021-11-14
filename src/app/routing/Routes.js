import { Route, Switch } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import { MainLayout } from '../../_kyn/components'
import { StorePage } from '../features/stores'
import { CircularProgress, Flex } from '@chakra-ui/react'

export function Routes() {

  const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
  const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'))
  const ProfilePage = lazy(() => import('../features/user/pages/ProfilePage'))
  return (
    <Suspense fallback={FallbackView}>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <MainLayout>
          <Route path='/profile/:userId' component={ProfilePage} />
          <Route path='/' component={StorePage} exact />
        </MainLayout>
      </Switch>
    </Suspense>
  )
}

const FallbackView = () => (
  <Flex justifyContent='center' alignItems='center' maxH={'100vh'}>
    <CircularProgress isIndeterminate color='pink.300' />
  </Flex>
)
