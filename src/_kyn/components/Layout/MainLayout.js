import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

export default function MainLayout({ children }) {
  return (
    <div style={{paddingBottom: '300px'}}>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}