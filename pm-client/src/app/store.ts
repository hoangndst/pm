import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/UserAuth'
import userReducer from '../auth/user'
import messageReducer from '../auth/messageSlice'

const reducer = {
  auth: authReducer,
  user: userReducer,
  message: messageReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>