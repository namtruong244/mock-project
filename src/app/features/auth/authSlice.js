import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import { push } from 'connected-react-router'
import { shopService } from '../../services/shopService'
import { CmnConst } from '../../../_kyn/const'
import customerService from '../../services/customerService'

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: '',
}

export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
  try {
    const response = await authService.login(params.userData)
    if (params.isRemember) {
      const userData = {
        phoneNumber: response.phoneNumber,
        role: params.userData.role,
      }
      localStorage.setItem(CmnConst.LOCAL_STORAGE_USER, JSON.stringify(userData))
    }
    thunkAPI.dispatch(push('/'))
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem(CmnConst.LOCAL_STORAGE_USER)
})

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params, thunkAPI) => {
  try {
    let response
    if (params.role === CmnConst.SHOP_ROLE) {
      response = await shopService.getInfoById(params.userId)
    } else {
      response = await customerService.getInfoByPhoneNumber(params.phoneNumber)
    }

    const userInfoLocalStorage = JSON.parse(localStorage.getItem(CmnConst.LOCAL_STORAGE_USER))
    if (userInfoLocalStorage && response.phoneNumber !== userInfoLocalStorage.phoneNumber) {
      userInfoLocalStorage.phoneNumber = response.phoneNumber
      localStorage.setItem(CmnConst.LOCAL_STORAGE_USER, JSON.stringify(userInfoLocalStorage))
    }
    return {
      userId: params.userId,
      phoneNumber: response.phoneNumber,
      name: response.name,
      avatar: response.avatar,
      role: params.role,
    }
  } catch (e) {
    console.log(e)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    resetErrorState(state) {
      state.error = false
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
      state.error = false
    },

    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.loading = false
      state.currentUser = action.payload
    },

    [logout.fulfilled]: (state) => initialState,

    [fetchUserData.fulfilled]: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
