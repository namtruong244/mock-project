import { StoreList } from '../components/StoreList'
import { useQuery } from 'react-query'
import { shopService } from '../../../services'
import { Box, CircularProgress, Flex } from '@chakra-ui/react'
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CmnConst } from '../../../../_kyn/const'
import { useShortenUrl } from 'react-shorten-url'

export function StorePage() {
  const { data, isLoading } = useQuery('shops', shopService.getAllShop)
  const [totalStore, setTotalStore] = useState()
  const [stores, setStores] = useState([])
  const currentUser = useSelector(({ auth }) => auth.currentUser)

  // constants
  const outerLimit = 2
  const innerLimit = 2
  const itemPerPage = 12

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage
  } = usePaginator({
    total: totalStore,
    initialState: {
      pageSize: itemPerPage,
      currentPage: 1,
      isDisabled: false,
    },
  })

  useEffect(() => {
    let storeSlice = data?.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
    if (currentUser?.role === CmnConst.SHOP_ROLE) {
      storeSlice = storeSlice?.filter(store => store.shopId !== currentUser.userId)
    }
    setStores(storeSlice)
    setTotalStore(data?.length)
  }, [data, currentPage, currentUser])

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' h={'43vh'}>
        <CircularProgress isIndeterminate color='pink.300' />
      </Flex>
    )
  }

  // handlers
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
  }

  return (
    <>
      <StoreList stores={stores} />
      {totalStore <= itemPerPage ? '' :
        <Box maxW={'1140px'} margin={'0 auto'}>
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
    </>
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
