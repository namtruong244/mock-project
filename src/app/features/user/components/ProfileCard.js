import React from 'react'
import { Avatar, Box, Button, Center, Flex, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { CmnConst } from '../../../../_kyn/const'
import { useDispatch } from 'react-redux'
import { profileModalActions } from '../profileModalSlice'


function ProfileCard(props) {
  const buttonProp = !props.isCurrentUser ? {color: '#151f21', name: 'Follow'} : {color: 'pink.400', name: 'Update profile'}
  const dispatch = useDispatch()
  const openProfileModal = () => {
    dispatch(profileModalActions.open())
  }

  return (
    <React.Fragment>
      <Center py={6} w={'full'}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
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
                <Text fontWeight={600}>{`${Math.floor(Math.random() * 10) + 1}000`}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{`${Math.floor(Math.random() * 10) + 1}000`}</Text>
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
              }}>
              {buttonProp.name}
            </Button>

          </Box>
        </Box>
      </Center>
    </React.Fragment>
  )
}

export default React.memo(ProfileCard)