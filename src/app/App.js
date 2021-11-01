import React from 'react'
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'
import { Routes } from './routing/Routes'
import { AuthInit } from './features/auth'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthInit>
        <CSSReset />
        <Routes />
      </AuthInit>
    </ChakraProvider>
  )
}

export default App
