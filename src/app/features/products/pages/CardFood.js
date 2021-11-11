import React from 'react'

import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi'
import { currencyFormatter, randomInt } from '../../../utils'
import { CmnConst } from '../../../../_kyn/const'
import fallBackImage from '../../../../_kyn/assest/images/no-image.png'

const data = {
  isNew: true,
  imageURL:
    'https://images.foody.vn/res/g1/4336/prof/s280x175/foody-upload-api-foody-mobile-ba-d305c10a-210701160800.jpeg',
  name: 'Bánh ngọt',
  price: 45000,
  rating: 4.2,
  numReviews: 54,
}

export function CardFood({ item }) {
  return (
    <React.Fragment>
      <Flex w="full">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />

          <Image
            fallbackSrc={fallBackImage}
            height={'11vw'}
            minW={'16vw'}
            maxW={'16vw'}
            objectFit="cover"
            src={`${CmnConst.BASE_64_PREFIX}${item.image}`}
            alt={`Picture of ${item.name}`}
            roundedTop="lg"
          />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {item.name}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}
              >
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Rating />
            </Flex>
            <Flex>
              <Box
                fontSize="2xl"
                color={useColorModeValue('gray.800', 'white')}
                mt={2}
              >
                {currencyFormatter.format(item.price)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  )
}

function Rating() {
  const randomRating = randomInt(1, 5)
  const randomReview = randomInt(1, 50)
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          if (randomRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={'pink.400'}
              />
            )
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {randomReview} review{randomReview > 1 && 's'}
      </Box>
    </Box>
  )
}