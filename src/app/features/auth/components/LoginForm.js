import * as Yup from 'yup'
import React, { useRef } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Stack,
  Text,
  useRadioGroup,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RadioCard from '../../../../_kyn/components/RadioCard/RadioCard'
import { Link as RouterLink } from 'react-router-dom'
import { CmnConst } from '../../../../_kyn/const'

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().max(20).required('Phone number is required'),
})

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  let role = useRef(CmnConst.SHOP_ROLE)
  const rememberRef = useRef(true)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: CmnConst.SHOP_ROLE,
    onChange: value => {
      role.current = value
    },
  })
  const group = getRootProps()

  const onSubmit = formData => {
    const data = {
      userData: {
        user: { PhoneNumber: '0' + formData.phoneNumber },
        role: role.current,
      },
      isRemember: rememberRef.current.checked,
    }
    props.onSubmit(data)
  }

  return (
    <React.Fragment>
      <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          mt={3}
          id='phoneNumber'
          isRequired
          isInvalid={errors.phoneNumber}
        >
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children='+84' />
            <Input
              type='tel'
              placeholder='Input your phone number here...'
              maxLength={9}
              {...register('phoneNumber')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormLabel mt={3}>Login with role:</FormLabel>
        <HStack {...group} mt={2}>
          {CmnConst.OPTIONS_ROLE.map(value => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
        <Stack spacing={6} mt={2}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox
              colorScheme={'pink'}
              ref={rememberRef}
              defaultIsChecked={rememberRef.current}
            >
              Remember me
            </Checkbox>
          </Stack>
          <Button
            size='md'
            height='48px'
            width='full'
            border='2px'
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
            isLoading={props.loading}
            type={'submit'}
          >
            Login
          </Button>
        </Stack>
        <Box textAlign='center'>
          <Text as='abbr'>
            If you don't have account,{' '}
            <Link as={RouterLink} to='/register' color={'pink.400'}>
              register here
            </Link>
          </Text>
        </Box>
      </form>
    </React.Fragment>
  )
}
