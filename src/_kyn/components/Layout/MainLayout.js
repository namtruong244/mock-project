import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

export default function MainLayout({ children }) {
  return (
    <React.Fragment>
      <NavBar />
      {children}
      <Footer />
    </React.Fragment>
  )
}