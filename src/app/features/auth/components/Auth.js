import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import BackGround from '../../../../_kyn/assest/images/background.jpg'
export default function Auth({ children, heading }) {
  const history = useHistory()
  const backToHomeHandler = () => {
    history.push('/')
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
        direction={'column'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack w={'full'} maxW={'md'}>
          <Button
            borderRadius={'50%'}
            w={'30px'}
            h={'40px'}
            onClick={backToHomeHandler}
            variant="outline"
            colorScheme="pink"
            aria-label="Back to home"
          >
            <ChevronLeftIcon />
          </Button>
        </Stack>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            {heading}
          </Heading>
          {children}
        </Stack>
      </Flex>
      <Flex
        flex={1.5}
        display={{ base: 'none', md: 'flex' }}
        sx={{ '@media screen': { marginInlineStart: '0 !important' } }}
      >
        <Image alt={'LoginPage Image'} objectFit={'cover'} src={BackGround} />
      </Flex>
    </Stack>
  )
}
