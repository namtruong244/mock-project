import * as Yup from 'yup'
import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'

const LoginSchema = Yup.object().shape({
  username: Yup.string().max(20).required('Username is required'),
  password: Yup.string().max(20).required('Password is required'),
})

export default function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = (formData) => {
    props.onSubmit(formData)
  }

  return (
    <React.Fragment>
      <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>

        <Heading fontSize={'2xl'}>Sign in to your account</Heading>
        {props.errorMsg &&
        <Alert status='error' mt={3}>
          <AlertIcon />
          <AlertTitle mr={2}>Login Fail</AlertTitle>
          <AlertDescription>{props.errorMsg}</AlertDescription>
        </Alert>}
        <FormControl mt={3} id='username' isRequired isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input type='text' placeholder={'Username'} {...register('username')} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={3} id='password' isRequired isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input type='password' {...register('password')} placeholder={'Password'} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Stack spacing={6}>
          <Stack
            mt={3}
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
            <Checkbox colorScheme='pink' defaultIsChecked>Remember me</Checkbox>
            <Link>Forgot password?</Link>
          </Stack>
          <Button color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                  isLoading={props.loading}
                  type={'submit'}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  )
}
