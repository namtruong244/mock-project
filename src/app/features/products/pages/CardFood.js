import React from 'react'

import {
  Badge,
  Box,
  Button,
  chakra,
  Circle,
  Flex,
  Icon,
  Image,
  Spacer,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { currencyFormatter } from '../../../utils'
import { CmnConst } from '../../../../_kyn/const'
import fallBackImage from '../../../../_kyn/assest/images/no-image.png'
import { Rating } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { productModalActions } from '../../stores'
import { cartService, productService } from '../../../services'
import { useMutation } from 'react-query'

export function CardFood({ item }) {
  const {data, mutate} = useMutation(productService.deleteProduct)
  const { data: dataAddItem , mutate: addItem } = useMutation(cartService.addItem)
  const currentUser = useSelector(({ auth }) => auth.currentUser)
  const cart = useSelector(({cart}) => cart)
  const isShop = currentUser?.role === CmnConst.SHOP_ROLE
  const dispatch = useDispatch()

  const editProductHandler = () => {
    dispatch(productModalActions.open(item))
  }

  console.log(dataAddItem)

  const deleteProductHandler = () => {
    const data = {
      shopId: currentUser.userId,
      itemId: item.itemId
    }
    mutate(data)
  }

  const addItemHandler = () => {
    const itemData = {
      itemId: item.itemId,
      customerId: currentUser.userId,
      cartId: cart.cart.cartId
    }
    addItem(itemData)
  }

  return (
    <React.Fragment>
      <Flex w='full'>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW='sm'
          borderWidth='1px'
          rounded='lg'
          shadow='lg'
          position='relative'
        >
          <Circle
            size='10px'
            position='absolute'
            top={2}
            right={2}
            bg='red.200'
          />

          <Image
            fallbackSrc={fallBackImage}
            height={'11vw'}
            minW={'16vw'}
            maxW={'16vw'}
            objectFit='cover'
            src={`${CmnConst.BASE_64_PREFIX}${item.image}`}
            alt={`Picture of ${item.name}`}
            roundedTop='lg'
          />

          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                New
              </Badge>
            </Box>
            <Flex mt='1' justifyContent='space-between' alignContent='center'>
              <Box
                maxW={'140px'}
                fontSize='xl'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                {item.name}
              </Box>
              {!isShop &&
              <Tooltip
                label='Add to cart'
                bg='white'
                placement={'top'}
                color={'gray.800'}
                fontSize={'1em'}
              >
                <Button color='pink.300' variant='outline' onClick={addItemHandler}>
                  <Icon as={FiShoppingCart} h={4} w={4} alignSelf={'center'} />
                </Button>
              </Tooltip>
              }
            </Flex>

            <Flex justifyContent='space-between' alignContent='center'>
              <Rating />
            </Flex>
            <Flex>
              <Box
                fontSize='2xl'
                color={useColorModeValue('gray.800', 'white')}
                mt={2}
              >
                {currencyFormatter.format(item.price)}
              </Box>
            </Flex>
            {isShop && item.shopId === currentUser.userId &&
            <Flex mt={2} justifyContent={'end'}>
              <Box>
                <Tooltip
                  label='Edit product'
                  bg='white'
                  placement={'top'}
                  color={'gray.800'}
                  fontSize={'1em'}
                >
                  <Button color='pink.300' variant='outline' onClick={editProductHandler}>
                    <Icon as={EditIcon} h={4} w={4} alignSelf={'center'} />
                  </Button>
                </Tooltip>
                <Tooltip
                  label='Delete product'
                  bg='white'
                  placement={'top'}
                  color={'gray.800'}
                  fontSize={'1em'}
                >
                  <Button ml={2} color='red.400' variant='outline' onClick={deleteProductHandler}>
                    <Icon as={DeleteIcon} h={4} w={4} alignSelf={'center'} />
                  </Button>
                </Tooltip>
              </Box>
            </Flex>
            }
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  )
}
