import ReactDOM from 'react-dom'
import React, { useEffect, useRef } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FormAvatarInput } from '../../../../_kyn/components'
import { useDispatch, useSelector } from 'react-redux'
import { CmnConst } from '../../../../_kyn/const'
import { useMutation } from 'react-query'
import { productModalActions } from '../ProductModalSlice'
import { productService } from '../../../services'
import { fetchUserData } from '../../auth'

const LoginSchema = Yup.object().shape({
  name: Yup.string().max(50).required('Name is required'),
  price: Yup.number().required('Price is required'),
})

export function ProductModal() {
  const currentProduct = useSelector(({ productModal }) => productModal)
  const {
    isLoading,
    isError,
    data,
    error,
    mutate,
  } = useMutation(currentProduct?.product ? productService.updateProduct : productService.createNewProduct)
  const currentUser = useSelector(({ auth }) => auth.currentUser)
  const isOpen = currentProduct.isOpen
  const dispatch = useDispatch()
  const toast = useToast()
  const imageFile = useRef(null)

  useEffect(() => {
    let status = 'success'
    let message = currentProduct?.product ? 'Update product success' : 'Create new product success'
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

    if (data && status === 'success') {
      dispatch(fetchUserData({
        phoneNumber: null,
        userId: currentUser.userId,
        role: currentUser.role,
      }))
    }

  }, [isError, data])

  useEffect(() => {
    if (isOpen) {
      reset({
        name: currentProduct?.product?.name,
        price: currentProduct?.product?.price,
      })
      imageFile.current = null
    }
  }, [isOpen])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = formData => {
    let bodyFormData = new FormData()
    if (currentProduct?.product) {
      bodyFormData.append('ItemId', currentProduct?.product.itemId)
    }
    bodyFormData.append('ShopId', currentUser.userId)
    bodyFormData.append('Name', formData.name)
    bodyFormData.append('Price', formData.price)
    if (imageFile.current) {
      bodyFormData.append('Image', imageFile.current)
    }
    mutate(bodyFormData)
  }

  const onCloseHandler = () => {
    dispatch(productModalActions.close())
  }

  const onChangeUserIconHandler = (image) => {
    imageFile.current = image
  }

  return ReactDOM.createPortal(
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCloseHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentProduct?.product ? 'Update product' : 'Add new product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form autoComplete='off' noValidate>
              <FormAvatarInput
                initImg={currentProduct?.product?.image ? `${CmnConst.BASE_64_PREFIX}${currentProduct.product.image}` : ''}
                label='Product image' buttonName='Change Image' onChangeImage={onChangeUserIconHandler} />
              <FormControl mt={3} id='name' isRequired isInvalid={errors.name}>
                <FormLabel>Product name</FormLabel>
                <Input
                  type='text'
                  defaultValue={currentProduct?.product?.name}
                  placeholder={'Input product name here...'}
                  {...register('name')}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={3} id='price' isRequired isInvalid={errors.price}>
                <FormLabel>Price</FormLabel>
                <Input
                  type='text'
                  defaultValue={currentProduct?.product?.price}
                  placeholder={'Input product price here...'}
                  {...register('price')}
                />
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit(onSubmit)} isLoading={isLoading}
                    loadingText='Submitting'>
              Save
            </Button>
            <Button onClick={onCloseHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    , document.querySelector('#modal-portal'))
}