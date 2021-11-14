import React from 'react'
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'
import { Routes } from './routing/Routes'
import { AuthInit } from './features/auth'
import { ShortenUrlProvider } from 'react-shorten-url'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ShortenUrlProvider config={{ accessToken: process.env.REACT_APP_BIT_LY_ACCESS_TOKEN }}>
        <AuthInit>
          <CSSReset />
          <Routes />
        </AuthInit>
      </ShortenUrlProvider>
    </ChakraProvider>
  )
}

export default App
