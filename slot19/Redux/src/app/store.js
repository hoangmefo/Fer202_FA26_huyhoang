import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterReducer.js'
import todoReducer from '../features/todos/todoReducer.js'
import filterReducer from '../features/todos/filterReducer.js'
import userReducer from '../features/users/userReducer.js'
import cartReducer, { restore } from '../features/cart/cartSlice.js'
import productsReducer from '../features/products/productsSlice.js'
import studentsReducer from '../features/students/studentsSlice.js'

const logger = () => (next) => (action) => {
  if (typeof action !== 'function') console.log('[action]', action.type)
  return next(action)
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    filter: filterReducer,
    users: userReducer,
    cart: cartReducer,
    products: productsReducer,
    students: studentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

function readSavedCart() {
  try {
    const saved = localStorage.getItem('redux-lab-cart')
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Không thể đọc giỏ hàng đã lưu:', error)
    return null
  }
}

const savedCart = readSavedCart()
if (Array.isArray(savedCart)) {
  store.dispatch(restore(savedCart))
}

store.subscribe(() => {
  try {
    localStorage.setItem('redux-lab-cart', JSON.stringify(store.getState().cart.items))
  } catch (error) {
    console.error('Không thể lưu giỏ hàng:', error)
  }
})
