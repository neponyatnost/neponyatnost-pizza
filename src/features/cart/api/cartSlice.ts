import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '../models/cart'

interface ICartStateProps {
  cart: ICartItem[]
}

const initialState: ICartStateProps = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ICartItem>) {
      state.cart.push(action.payload)
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      )
    },
    increaseItemQuantityInCart(state, action: PayloadAction<number>) {
      const pizza = state.cart.find((i) => i.pizzaId === action.payload)

      if (pizza) {
        pizza.quantity++
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
    },
    decreaseItemQuantityInCart(state, action: PayloadAction<number>) {
      const pizza = state.cart.find((i) => i.pizzaId === action.payload)

      if (pizza) {
        pizza.quantity--
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
        if (pizza.quantity === 0) {
          cartSlice.caseReducers.removeItemFromCart(state, action)
        }
      }
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantityInCart,
  decreaseItemQuantityInCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getTotalCartQuantity = (state: ICartStateProps) => {
  state.cart.reduce((a, b) => a + b.quantity, 0)
}

export const getCurrentQuantityById =
  (id: number) => (state: ICartStateProps) => {
    return state.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
  }
