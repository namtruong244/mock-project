import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../app/features/auth'
import { FiBell, FiChevronDown } from 'react-icons/all'
import { CmnConst } from '../../const'
import { profileModalActions } from '../../../app/features/user/profileModalSlice'
import Logo from '../../assest/images/logo.png'

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure()
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn)
  const currentUser = useSelector(({ auth }) => auth.currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  const profileHandler = () => {
    if (isLoggedIn) {
      if (currentUser.role === CmnConst.SHOP_ROLE) {
        history.push(`/profile/${currentUser.userId}`)
      } else if (currentUser.role === CmnConst.CUSTOMER_ROLE) {
        dispatch(profileModalActions.open())
      }
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <RouterLink to='/'>
            <Image src={Logo} w={'120px'} />
          </RouterLink>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {!isLoggedIn && (
            <>
              <Button
                as={RouterLink}
                fontSize={'sm'}
                fontWeight={400}
                to={'/login'}
                variant={Link}
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                fontSize={'sm'}
                fontWeight={400}
                color={'white'}
                bg={'pink.400'}
                to={'/register'}
                _hover={{
                  bg: 'pink.300',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <HStack spacing={{ base: '0', md: '6' }}>
              <IconButton
                size='lg'
                variant='ghost'
                aria-label='open menu'
                icon={<FiBell />}
              />
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    py={2}
                    transition='all 0.3s'
                    _focus={{ boxShadow: 'none' }}
                  >
                    <HStack>
                      <Avatar
                        size={'sm'}
                        src={`${CmnConst.BASE_64_PREFIX}${currentUser.avatar}`}
                      />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems='flex-start'
                        spacing='1px'
                        minW={'50px'}
                        ml='2'
                      >
                        <Text fontSize='sm' width={'max-content'}>
                          {currentUser.name}
                        </Text>
                        <Text
                          fontSize='xs'
                          color='gray.600'
                          textTransform={'capitalize'}
                          fontWeight={'bold'}
                        >
                          {currentUser.role}
                        </Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList bg={'white'} borderColor={'gray.200'}>
                    <MenuItem
                      onClick={profileHandler}
                      _hover={{ bg: 'pink.50', color: 'pink.400' }}
                      _focus={'none'}
                    >
                      {currentUser.role === CmnConst.SHOP_ROLE
                        ? 'Profile'
                        : 'Update profile'}
                    </MenuItem>
                    <MenuItem _hover={{ bg: 'pink.50', color: 'pink.400' }}>
                      Settings
                    </MenuItem>
                    <MenuItem _hover={{ bg: 'pink.50', color: 'pink.400' }}>
                      Billing
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={logoutHandler}
                      _hover={{ bg: 'pink.50', color: 'pink.400' }}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>
          )}
        </Stack>
      </Flex>
    </Box>
  )
}
