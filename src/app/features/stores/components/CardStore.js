import React from 'react'

import { Badge, Box, Circle, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { Rating } from '../../products'
import { CmnConst } from '../../../../_kyn/const'
import { Link } from 'react-router-dom'
import fallBackImage from '../../../../_kyn/assest/images/no-image.png'

export function CardStore({ store }) {
  return (
    <React.Fragment>
      <Flex w='60'>
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

          <Link to={`/profile/${store.shopId}`}>
            <Image
              fallbackSrc={fallBackImage}
              height={{ base: '45vw', md: '25vw', lg: '10vw' }}
              minW={{ base: '60vw', md: '25vw', lg: '16vw' }}
              maxW={{ base: '60vw', md: '25vw', lg: '16vw' }}
              objectFit='cover'
              src={`${CmnConst.BASE_64_PREFIX}${store.image}`}
              alt={`Picture of ${store.name}`}
              roundedTop='lg'
            />
          </Link>

          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                New
              </Badge>
            </Box>
            <Flex mt='1' justifyContent='space-between' alignContent='center'>
              <Box
                fontSize='2xl'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                <Link to={`/profile/${store.shopId}`}>{store.name}</Link>
              </Box>
            </Flex>

            <Flex
              direction='column'
              justifyContent='space-between'
              alignContent='center'
            >
              <Text>{store.phoneNumber}</Text>
              <Rating />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  )
}
