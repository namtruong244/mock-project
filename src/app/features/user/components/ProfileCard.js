import React, { useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { CmnConst } from '../../../../_kyn/const'
import { useDispatch, useSelector } from 'react-redux'
import { profileModalActions } from '../profileModalSlice'
import { randomInt } from '../../../utils'
import { productModalActions } from '../../stores'
import { useMutation } from 'react-query'
import { cartService } from '../../../services'
import { CartModal, getExistCart } from '../../cart'

function ProfileCard(props) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data: createCartData, mutate: createCart } = useMutation(cartService.createCart)
  const isCurrentUser = props.currentUser?.userId === props.shopId
  const dispatch = useDispatch()
  const cart = useSelector(({cart}) => cart)

  const buttonProp = !isCurrentUser
    ? { color: '#151f21', name: 'Follow' }
    : {
      color: 'pink.400',
      name: 'Update profile',
    }
  const cartButtonProp = cart.cart ? {
    type: 'view',
    name: 'View cart'
  } : {
    type: 'create',
    name: 'Create new cart'
  }
  const cartInfo = {
    customerId: props.currentUser?.userId,
    shopId: props.shopId
  }

  useEffect(() => {
    dispatch(getExistCart(cartInfo))
  }, [createCartData])

  const openProfileModal = () => {
    if (isCurrentUser) {
      dispatch(profileModalActions.open())
    }
  }

  const openProductModal = () => {
    dispatch(productModalActions.open())
  }

  const cartHandler = () => {
    if (cartButtonProp.type === 'create') {
      createCart(cartInfo)
    }else if (cartButtonProp.type === 'view') {
      onOpen()
    }
  }

  return (
    <React.Fragment>
      <CartModal isOpen={isOpen} onClose={onClose} cartInfo={cartInfo} shopInfo={props.userData}/>
      <Center py={6} w={'full'} alignItems={'start'}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          position={'sticky'}
          top={'10px'}
        >
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={`${CmnConst.BASE_64_PREFIX}${props.userData?.image}`}
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {props.userData?.name}
              </Heading>
              <Text color={'gray.500'}>{props.userData?.phoneNumber}</Text>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{`${randomInt(1000, 5000)}`}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{`${randomInt(1000, 5000)}`}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Like
                </Text>
              </Stack>
            </Stack>

            <Button
              w={'full'}
              mt={8}
              onClick={openProfileModal}
              bg={useColorModeValue(buttonProp.color, 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              {buttonProp.name}
            </Button>
            {isCurrentUser &&
              <Button
                w={'full'}
                mt={3}
                onClick={openProductModal}
                bg={useColorModeValue('teal.400', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Add New Product
              </Button>
            }
            {props.currentUser && props.currentUser.role === CmnConst.CUSTOMER_ROLE &&
              <Button
                w={'full'}
                mt={3}
                onClick={cartHandler}
                bg={useColorModeValue('pink.400', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                {cartButtonProp.name}
              </Button>
            }
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  )
}

export default React.memo(ProfileCard)
