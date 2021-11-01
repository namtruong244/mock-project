import RegisterForm from '../components/RegisterForm'
import Auth from '../components/Auth'
import authService from '../../../services/authService'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'

export default function RegisterPage() {
  const toast = useToast()
  const { isLoading, isError, data, error, mutate } = useMutation(
    authService.register
  )

  const registerHandler = userData => {
    mutate(userData)
  }

  useEffect(() => {
    let status = 'success'
    let message = 'Register success'
    let title = 'Success'

    if (isError || data?.errorMessage) {
      title = 'Error'
      status = 'error'
      message = isError ? error?.response.data : data?.errorMessage
    }
    if (isError || data) {
      toast({
        position: 'top-right',
        title: title,
        description: message,
        status: status,
        duration: 6000,
        isClosable: true,
      })
    }
  }, [isError, data])

  return (
    <Auth heading="Register">
      <RegisterForm isLoading={isLoading} onSubmit={registerHandler} />
    </Auth>
  )
}
