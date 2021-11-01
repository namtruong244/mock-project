import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Avatar, AvatarBadge,
  Button, Center, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftAddon,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Stack, useRadioGroup,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import RadioCard from '../../../../_kyn/components/RadioCard/RadioCard'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { CmnConst } from '../../../../_kyn/const'
import * as Yup from 'yup'
import { FormAvatarInput } from '../../../../_kyn/components'

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().max(20).required('Phone number is required'),
  name: Yup.string().max(20).required('Your name is required'),
})

export default function ProfileModal({isOpen, onClose}) {

  const initialRef = React.useRef()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  const previewImg = useRef(null)

  const onSubmit = formData => {
    let bodyFormData = new FormData();
    bodyFormData.append("Name", formData.name)
    bodyFormData.append("PhoneNumber", "0" + formData.phoneNumber)
    // const currentRole = role.current
    // if (previewImg) {
    //   bodyFormData.append(currentRole === CmnConst.SHOP_ROLE ? "Logo" : "Avatar", previewImg)
    // }
    // const userData = {
    //   user: bodyFormData,
    //   role: currentRole
    // }
    // props.onSubmit(userData)
  }

  const onChangeUserIconHandler = (image) => {
    previewImg.current = image
  }

  return React.createPortal(
    <>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormAvatarInput label="User Icon" buttonName="Change Icon" onChangeImage={onChangeUserIconHandler}/>
              <FormControl
                mt={3}
                id="phoneNumber"
                isRequired
                isInvalid={errors.phoneNumber}
              >
                <FormLabel>Phone number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+84" />
                  <Input
                    type="tel"
                    placeholder="Input your phone number here..."
                    maxLength={9}
                    {...register('phoneNumber')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
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
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  , )
}