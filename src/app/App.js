import React from 'react'
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'
import { Routes } from './routing/Routes'
import { AuthInit } from './features/auth'
import ProfileModal from './features/user/components/ProfileModal'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthInit>
        <CSSReset />
        <Routes />
        <ProfileModal />
      </AuthInit>
    </ChakraProvider>
  )
}

export default App
