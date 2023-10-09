import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/api/cartSlice'
import userReducer from '../features/user/api/userSlice'

const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
