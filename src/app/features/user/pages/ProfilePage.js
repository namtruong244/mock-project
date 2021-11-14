import ProfileCard from '../components/ProfileCard'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { shopService } from '../../../services'
import { Box, CircularProgress, Flex, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { history } from '../../../utils'
import { StoreDetail } from '../../stores'
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { CartModal } from '../../cart'
import ProfileModal from '../components/ProfileModal'
import { ProductModal } from '../../stores/components/ProductModal'

export default function ProfilePage() {
  const { userId } = useParams()
  const currentUser = useSelector(state => state.auth.currentUser)
  const { data, isLoading, refetch, isError } = useQuery('profile', () =>
    shopService.getInfoById(userId)
  )
  const [totalProduct, setTotalProduct] = useState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    refetch()
  }, [userId, currentUser])

  // constants
  const outerLimit = 2
  const innerLimit = 2
  const itemPerPage = 9

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage
  } = usePaginator({
    total: totalProduct,
    initialState: {
      pageSize: itemPerPage,
      currentPage: 1,
      isDisabled: false,
    },
  })

  useEffect(() => {
    let productSlice = data?.items?.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
    productSlice = productSlice?.filter(product => product.isActive)
    setProducts(productSlice)
    setTotalProduct(data?.items?.length)
  }, [data, currentPage])

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' h={'43vh'}>
        <CircularProgress isIndeterminate color="pink.300" />
      </Flex>
    )
  }

  if (isError || data?.errorMessage) {
    history.push('/')
    return
  }

  // handlers
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} maxW={'1140px'} margin={'0 auto'}>
      <ProfileModal />
      <ProductModal />
      <Flex flex={0.5} w={'100%'} mr={4}>
        <ProfileCard
          shopId={userId}
          userData={data}
          currentUser={currentUser}
        />
      </Flex>
      <Flex flex={1.5} mt={3} direction={'column'}>
        <StoreDetail products={products}/>
        {totalProduct <= itemPerPage ? '' :
          <Box w={'full'} margin={'0 auto'}>
            <Paginator
              isDisabled={isDisabled}
              activeStyles={activeStyles}
              innerLimit={innerLimit}
              currentPage={currentPage}
              outerLimit={outerLimit}
              normalStyles={normalStyles}
              separatorStyles={separatorStyles}
              pagesQuantity={pagesQuantity}
              onPageChange={handlePageChange}
            >
              <Container align='center' justify='space-between' w='full' p={4}>
                <Previous>
                  Previous
                </Previous>
                <PageGroup isInline align='center' />
                <Next>
                  Next
                </Next>
              </Container>
            </Paginator>
          </Box>
        }
      </Flex>
    </Stack>
  )
}

// styles
const baseStyles = {
  w: 10,
  fontSize: 'sm',
}

const normalStyles = {
  ...baseStyles,
  _hover: {
    bg: 'pink.400',
  },
  color: 'white',
  bg: 'gray.300',
}

const activeStyles = {
  ...baseStyles,
  _hover: {
    bg: 'pink.400',
  },
  color: 'white',
  bg: 'pink.300',
}

const separatorStyles = {
  w: 10,
  bg: 'gray.200',
}