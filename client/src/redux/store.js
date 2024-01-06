import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlikce'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})