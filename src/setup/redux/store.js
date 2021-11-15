import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authReducer } from '../../app/features/auth'
import { profileModalReducer } from '../../app/features/user'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history } from '../../app/utils'
import { productModalReducer } from '../../app/features/stores'
import { cartReducer } from '../../app/features/cart'

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  cart: cartReducer,
  profileModal: profileModalReducer,
  productModal: productModalReducer,
})

const middleWare = [
  ...getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: true,
    thunk: true,
  }),
  routerMiddleware(history),
]

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWare,
  devTools: process.env.NODE_ENV !== 'production',
})
