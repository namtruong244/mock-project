import React, { useEffect, useState } from 'react'
import authService from '../../../services/authService'
import { authActions, login } from '../authSlice'
import { history } from '../../../utils'
import { useDispatch } from 'react-redux'

export default function AuthInit({ children }) {
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const token = localStorage.getItem('token')

  // We should request user by authToken before rendering the application
  useEffect(async () => {
    // const requestUser = async () => {
    //   try {
    //
    //     const { data } = await authService.refreshToken(token!)
    //     dispatch(authActions.loginSuccess(data))
    //   } catch (error) {
    //     dispatch(authActions.logout())
    //   } finally {
    //     setShowSplashScreen(false)
    //   }
    // }
    //
    // if (token) {
    //   requestUser()
    // } else {
    //   history.push('/login')
    //   setShowSplashScreen(false)
    // }

    if (token) {
      await dispatch(login(JSON.parse(token)))
    } else {
      history.push('/login')
    }
    setShowSplashScreen(false)

    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <p>Loading...</p> : <>{children}</>
}