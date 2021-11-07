import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authReducer } from '../../app/features/auth'
import { profileModalReducer } from '../../app/features/user'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history } from '../../app/utils'

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  profileModal: profileModalReducer,
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
