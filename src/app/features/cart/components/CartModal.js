import React, { useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getExistCart } from '../cartSlice'
import { currencyFormatter } from '../../../utils'
import { CmnConst } from '../../../../_kyn/const'
import fallBackImage from '../../../../_kyn/assest/images/no-image.png'
import { useMutation } from 'react-query'
import { cartService } from '../../../services'

export function CartModal(props) {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }) => cart)
  const currentUser = useSelector(({auth}) => auth.currentUser)
  const {data:dataAddItem, mutate: addItem} = useMutation(cartService.addItem)
  const {data:dataRemoveItem, mutate: remoteItem} = useMutation(cartService.removeItem)
  const {mutate: submitCart, isLoading: isLoadingSubmit} = useMutation(cartService.submitCart)
  const {mutate: unSubmitCart, isLoading: isLoadingUnSubmit} = useMutation(cartService.unSubmitCart)

  const handlePlus = itemId => {
    const data = {
      cartId: cart.cart.cartId,
      customerId: currentUser.userId,
      itemId: itemId
    }
    addItem(data)
  }

  const handleMinute = itemId => {
    const data = {
      cartId: cart.cart.cartId,
      customerId: currentUser.userId,
      itemId: itemId
    }
    remoteItem(data)
  }

  const submitOrderHandler = () => {
    const list_item = cart.cart?.itemsInCart.map(item => ({
      amount: item.amount,
      itemId: item.itemId,
      isDeleted: item.isDeleted
    }))
    const orderData = {
      customerId: currentUser.userId,
      cartId: cart.cart.cartId,
      items: list_item
    }
    submitCart(orderData)
  }

  useEffect(() => {
    dispatch(getExistCart(props.cartInfo))
  }, [props.isOpen, dataAddItem, dataRemoveItem])

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your cart of {props.shopInfo.name} shop</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              {cart.isLoading && (
                <Flex justifyContent="center" alignItems="center" h={'100vh'}>
                  <CircularProgress isIndeterminate color="pink.300" />
                </Flex>
              )}
              {cart.cart?.itemsInCart?.length === 0 && (
                <Text as={'h4'}>Your cart is empty</Text>
              )}
              {cart.cart?.itemsInCart?.map(cartItem => (
                <Box
                  key={cartItem.itemId}
                  border="1px"
                  borderRadius={'5px'}
                  overflow={'hidden'}
                  mt={2}
                >
                  <Flex direction={'row'}>
                    <Image
                      fallbackSrc={fallBackImage}
                      boxSize="50px"
                      objectFit="cover"
                      src={`${CmnConst.BASE_64_PREFIX}${cartItem.image}`}
                      alt="product image"
                    />
                    <Flex direction={'column'} ml={2} flex={'1'}>
                      <Text fontWeight={'bold'}>Name: {cartItem.itemName}</Text>
                      <Text>
                        Price: {currencyFormatter.format(cartItem.price)}
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'} mr={1}>
                      <Box>
                        <NumberInput
                          size="md"
                          maxW={20}
                          min={0}
                          defaultValue={cartItem.amount}
                        >
                          <NumberInputField disabled opacity="10 !important" />
                          <NumberInputStepper>
                            <NumberIncrementStepper onClick={handlePlus.bind(null, cartItem.itemId)} />
                            <NumberDecrementStepper onClick={handleMinute.bind(null, cartItem.itemId)} />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            <Flex justifyContent={'end'}>
              <Text mt={2}>Total: {currencyFormatter.format(cart?.cart?.totalPrice )}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            {!cart.isLoading && cart.cart?.itemsInCart?.length > 0 && (
              <Button colorScheme="pink" mr={3} loadingText="Submitting" onClick={submitOrderHandler}>
                Order
              </Button>
            )}
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
