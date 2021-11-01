import { useDispatch, useSelector } from 'react-redux'
import { authActions, login } from '../authSlice'
import LoginForm from '../components/LoginForm'
import Auth from '../components/Auth'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

export default function LoginPage() {
  const loading = useSelector(({ auth }) => auth.loading)
  const loginErrorMsg = useSelector(({ auth }) => auth.error)
  const dispatch = useDispatch()
  const toast = useToast()

  const loginHandler = (user) => {
    dispatch(login(user))
  }

  useEffect(() => {
    if (loginErrorMsg) {
      toast({
        position: 'top-right',
        title: "Error",
        description: loginErrorMsg,
        status: "error",
        duration: 6000,
        isClosable: true,
      })
    }

    return () => {
      toast.closeAll()
      dispatch(authActions.resetErrorState())
    }

  }, [loading])

  return (
    <Auth heading={'Login'}>
      <LoginForm loading={loading} onSubmit={loginHandler} />
    </Auth>
  )
}