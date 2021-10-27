import { Flex, Image, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../authSlice'
import RegisterForm from '../components/RegisterForm'

export default function LoginPage() {
  const loading = useSelector(({ auth }) => auth.loading)
  const loginErrorMsg = useSelector(({ auth }) => auth.error)
  const dispatch = useDispatch()

  const loginHandler = user => {
    dispatch(login(user))
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <RegisterForm
            loading={loading}
            onSubmit={loginHandler}
            errorMsg={loginErrorMsg}
          />
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'LoginPage Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}
