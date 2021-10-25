import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import { push } from 'connected-react-router'

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: ''
}

export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
  try{
    const response = await authService.login(params)
    localStorage.setItem('token', JSON.stringify(response))
    thunkAPI.dispatch(push('/'))
    return response
  }catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token')
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
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

    [logout.fulfilled]: (state) => initialState
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
