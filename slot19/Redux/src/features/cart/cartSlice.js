import { createSelector, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    restore(state, action) {
      state.items = action.payload
    },
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity < existing.stock) existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    increaseQty(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item && item.quantity < item.stock) item.quantity += 1
    },
    decreaseQty(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return
      if (item.quantity > 1) item.quantity -= 1
      else state.items = state.items.filter((entry) => entry.id !== action.payload)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((entry) => entry.id !== action.payload)
    },
    clearCart() {
      return { items: [] }
    },
  },
})

export const {
  addToCart,
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  restore,
} = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
export const selectQtyInCart = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0
