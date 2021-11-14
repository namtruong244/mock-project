import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartService } from '../../services'

const initialState = {
  loading: false,
  cart: undefined,
}

export const getExistCart = createAsyncThunk('cart/getExistCart', async (params, thunkAPI) => {
  return await cartService.getExistCart(params)
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [getExistCart.pending]: (state) => {
      state.loading = true
    },

    [getExistCart.rejected]: (state, action) => {
      state.loading = false
      state.cart = undefined
    },

    [getExistCart.fulfilled]: (state, action) => {
      state.loading = false
      state.cart = action.payload
    },
  },
})

export const cartActions = cartSlice.actions

export const cartReducer = cartSlice.reducer
