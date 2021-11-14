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

export function CartModal(props) {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }) => cart)

  const handlePlus = number => {
    console.log('1')
  }

  const handleMinute = number => {
    console.log('2')
  }

  useEffect(() => {
    dispatch(getExistCart(props.cartInfo))
  }, [props.isOpen])

  // console.log(cart.cart)

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your cart of {props.shopInfo.name} shop</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form autoComplete="off" noValidate>
              {/*<FormAvatarInput initImg={currentUser ? `${CmnConst.BASE_64_PREFIX}${currentUser?.avatar}` : ''}*/}
              {/*                 label='User Icon' buttonName='Change Icon' onChangeImage={onChangeUserIconHandler} />*/}
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
                            <NumberIncrementStepper onClick={handlePlus} />
                            <NumberDecrementStepper onClick={handleMinute} />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </form>
          </ModalBody>

          <ModalFooter>
            {!cart.isLoading && cart.cart?.itemsInCart?.length > 0 && (
              <Button colorScheme="pink" mr={3} loadingText="Submitting">
                Submit
              </Button>
            )}
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
