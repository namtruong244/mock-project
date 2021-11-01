import ProfileCard from '../components/ProfileCard'
import { useParams } from 'react-router-dom'
import { useEffect, Fragment } from 'react'
import { useQuery } from 'react-query'
import shopService from '../../../services/shopService'
import { Box, Flex, HStack, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { history } from '../../../utils'

export default function ProfilePage() {
  const { userId } = useParams()
  const currentUser = useSelector((state) => state.auth.currentUser)
  // const { isLoading, isRefetching, data, refetch } = useQuery('profile', () => shopService.getInfoById(userId))
  const data = {
    name: "aaaaa",
    phoneNumber: "093414556"
  }

  // useEffect(() => {
  //   refetch()
  // }, [userId])

  // if (data?.errorMessage) {
  //   history.push('/')
  // }

  // if (isLoading || isRefetching) {
  //   return (
  //     <Box padding="6" boxShadow="lg" bg="white">
  //       <SkeletonCircle size="10" />
  //       <SkeletonText mt="4" noOfLines={4} spacing="4" />
  //     </Box>
  //   )
  // }

  return (
    <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex flex={0.5} w={'100%'}>
          <ProfileCard userData={data} isCurrentUser={currentUser?.userId === userId}/>
        </Flex>
        <Flex flex={1.5} mt={3}>
          Product
        </Flex>
    </Stack>
    )

}
