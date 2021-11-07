import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const profileModalSlice = createSlice({
  name: 'profileModal',
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true
    },
    close(state) {
      state.isOpen = false
    },
  },
})

export const profileModalActions = profileModalSlice.actions

export default profileModalSlice.reducer
