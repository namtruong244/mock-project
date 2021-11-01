import { Flex, Heading, Image, Stack, useColorModeValue } from '@chakra-ui/react'

export default function Auth({children, heading}) {

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'}
               boxShadow={'lg'} p={6} my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            {heading}
          </Heading>
          {children}
        </Stack>
      </Flex>
      <Flex flex={1.5} sx={{'@media screen': { 'marginInlineStart': '0 !important' }}}>
        <Image
          alt={'LoginPage Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}
