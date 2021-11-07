import React, { useEffect, useState } from 'react'
import { authActions, logout } from '../authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../../services/authService'
import { CmnConst } from '../../../../_kyn/const'

export default function AuthInit({ children }) {
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const userInfo = JSON.parse(localStorage.getItem(CmnConst.LOCAL_STORAGE_USER))

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        const loginData = {
          user: { PhoneNumber: userInfo.phoneNumber },
          role: userInfo.role,
        }
        const response = await authService.login(loginData)
        dispatch(authActions.setUserInfo(response))
      } catch (e) {
        dispatch(logout())
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (userInfo) {
      requestUser()
    } else {
      setShowSplashScreen(false)
    }

    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <p>Loading...</p> : <>{children}</>
}