import * as Yup from 'yup'
import React, { useRef } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useRadioGroup,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RadioCard from '../../../../_kyn/components/RadioCard/RadioCard'
import { CmnConst } from '../../../../_kyn/const'
import { FormAvatarInput } from '../../../../_kyn/components'

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().max(10).required('Phone number is required'),
  name: Yup.string().max(50).required('Your name is required'),
})

export default function RegisterForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const role = useRef(CmnConst.SHOP_ROLE)
  const previewImg = useRef(null)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: CmnConst.SHOP_ROLE,
    onChange: value => {
      role.current = value
    },
  })
  const group = getRootProps()

  const onSubmit = formData => {
    let bodyFormData = new FormData()
    bodyFormData.append('Name', formData.name)
    bodyFormData.append('PhoneNumber', '0' + formData.phoneNumber)
    const currentRole = role.current
    if (previewImg.current) {
      bodyFormData.append(
        currentRole === CmnConst.SHOP_ROLE ? 'Logo' : 'Avatar',
        previewImg.current,
      )
    }
    const userData = {
      user: bodyFormData,
      role: currentRole,
    }
    props.onSubmit(userData)
  }

  const onChangeUserIconHandler = image => {
    previewImg.current = image
  }

  return (
    <React.Fragment>
      <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormAvatarInput
          label="User's Avatar"
          buttonName='Change Avatar'
          onChangeImage={onChangeUserIconHandler}
        />
        <FormControl
          mt={3}
          id='phoneNumber'
          isRequired
          isInvalid={errors.phoneNumber}
        >
          <FormLabel>Phone number</FormLabel>
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
          <FormControl mt={3} id='name' isRequired isInvalid={errors.name}>
            <FormLabel>Your name</FormLabel>
            <Input
              type='text'
              placeholder={'Input your name here...'}
              {...register('name')}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        </FormControl>
        <FormLabel mt={3}>Register with role:</FormLabel>
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
        <Stack spacing={6} direction={['column', 'row']} mt={4}>
          <Button
            isLoading={props.isLoading}
            loadingText='Submitting'
            type={'submit'}
            bg={'pink.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'pink.300',
            }}
          >
            Register
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  )
}
