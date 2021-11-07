import ReactDOM from 'react-dom'
import React, { useEffect, useRef } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FormAvatarInput } from '../../../../_kyn/components'
import { useDispatch, useSelector } from 'react-redux'
import { profileModalActions } from '../profileModalSlice'
import { CmnConst } from '../../../../_kyn/const'
import { useMutation } from 'react-query'
import authService from '../../../services/authService'
import { fetchUserData } from '../../auth'

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().max(20).required('Phone number is required'),
  name: Yup.string().max(20).required('Your name is required'),
})

export default function ProfileModal() {
  const { isLoading, isError, data, error, mutate } = useMutation(authService.updateUserInfo)
  const isOpen = useSelector(({ profileModal }) => profileModal.isOpen)
  const currentUser = useSelector(({ auth }) => auth.currentUser)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    let status = 'success'
    let message = 'Update info success'
    let title = "Success"

    if (isError || data?.errorMessage) {
      title = "Error"
      status = 'error'
      message = isError ? error?.response.data : data?.errorMessage
    }
    if (isError || data ) {
      toast({
        position: 'top-right',
        title: title,
        description: message,
        status: status,
        duration: 6000,
        isClosable: true,
      })
    }

    if (data && status === 'success') {
      dispatch(fetchUserData(currentUser.userId))
    }

  }, [isError, data])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  const previewImg = useRef(null)

  const onSubmit = formData => {
    let bodyFormData = new FormData()
    bodyFormData.append('Name', formData.name)
    bodyFormData.append('PhoneNumber', currentUser.phoneNumber)
    if (formData.phoneNumber !== currentUser.phoneNumber) {
      bodyFormData.append('NewPhoneNumber', '0' + formData.phoneNumber)
    }
    if (previewImg.current) {
      bodyFormData.append(currentUser.role === CmnConst.SHOP_ROLE ? "Logo" : "Avatar", previewImg.current)
    }
    const userData = {
      user: bodyFormData,
      role: currentUser.role
    }
    mutate(userData)
  }

  const onCloseHandler = () => {
    dispatch(profileModalActions.close())
  }

  const onChangeUserIconHandler = (image) => {
    previewImg.current = image
  }

  return ReactDOM.createPortal(
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCloseHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form autoComplete='off' noValidate>
              <FormAvatarInput initImg={currentUser ? `${CmnConst.BASE_64_PREFIX}${currentUser?.avatar}` :  ''} label='User Icon' buttonName='Change Icon' onChangeImage={onChangeUserIconHandler} />
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
                    defaultValue={currentUser?.phoneNumber}
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
                    defaultValue={currentUser?.name}
                    placeholder={'Input your name here...'}
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit(onSubmit)} isLoading={isLoading} loadingText="Submitting">
              Save
            </Button>
            <Button onClick={onCloseHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    , document.querySelector('#modal-portal'))
}