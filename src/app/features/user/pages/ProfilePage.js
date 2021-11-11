import ProfileCard from '../components/ProfileCard'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import shopService from '../../../services/shopService'
import { Flex, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { history } from '../../../utils'
import { StoreDetail } from '../../../features/products/pages/StoreDetail'

export default function ProfilePage() {
  const { userId } = useParams()
  const currentUser = useSelector(state => state.auth.currentUser)
  const { data, refetch, isError } = useQuery('profile', () =>
    shopService.getInfoById(userId)
  )

  useEffect(() => {
    refetch()
  }, [userId, currentUser])

  if (isError || data?.errorMessage) {
    history.push('/')
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} maxW={'1140px'} margin={'0 auto'}>
      <Flex flex={0.5} w={'100%'} mr={4}>
        <ProfileCard
          userData={data}
          isCurrentUser={currentUser?.userId === userId}
        />
      </Flex>
      <Flex flex={1.5} mt={3}>
        <StoreDetail products={data?.items}/>
      </Flex>
    </Stack>
  )
}
