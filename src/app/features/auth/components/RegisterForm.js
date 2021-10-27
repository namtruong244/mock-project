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
  RadioGroup,
  Radio,
  InputLeftAddon,
  InputGroup,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { SmallCloseIcon } from '@chakra-ui/icons'

const LoginSchema = Yup.object().shape({
  phonenumber: Yup.string().max(20).required('Phone number is required'),
  name: Yup.string().max(20).required('Your name is required'),
  // password: Yup.string().max(20).required('Password is required'),
})

export default function RegisterForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = formData => {
    props.onSubmit(formData)
  }

  return (
    <React.Fragment>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        {props.errorMsg && (
          <Alert status="error" mt={3}>
            <AlertIcon />
            <AlertTitle mr={2}>Register Fail</AlertTitle>
            <AlertDescription>{props.errorMsg}</AlertDescription>
          </Alert>
        )}
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            {/* <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center> */}
          </Stack>
        </FormControl>
        <FormControl
          mt={3}
          id="phonenumber"
          isRequired
          isInvalid={errors.phonenumber}
        >
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+84" />
            <Input
              type="tel"
              placeholder="Input your phone number here..."
              maxLength={9}
              {...register('phonenumber')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.phonenumber?.message}</FormErrorMessage>
          <FormControl mt={3} id="name" isRequired isInvalid={errors.name}>
            <FormLabel>Your name</FormLabel>
            <Input
              type="text"
              placeholder={'Input your name here...'}
              {...register('name')}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>Login with role:</FormLabel>
          <RadioGroup defaultValue="customer">
            <Stack spacing={10} direction="row">
              <Radio value="customer" colorScheme="pink">
                Customer
              </Radio>
              <Radio value="shop" colorScheme="pink">
                Shop
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Stack spacing={6} align="center">
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
            isLoading={props.loading}
            type={'submit'}
            mt={3}
          >
            Login
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  )
}
