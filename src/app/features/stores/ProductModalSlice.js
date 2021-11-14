import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  product: undefined
}

const productModalSlice = createSlice({
  name: 'productModal',
  initialState,
  reducers: {
    open(state, action) {
      state.isOpen = true
      state.product = action.payload
    },
    close(state) {
      state.isOpen = false
      state.product = undefined
    },
  },
})

export const productModalActions = productModalSlice.actions

export default productModalSlice.reducer
