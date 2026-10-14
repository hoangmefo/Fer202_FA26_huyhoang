import { getFinalPrice } from '../utils/format.js'

export const MAX_QUANTITY = 10

export const CART_ACTIONS = {
  ADD: 'cart/add',
  INCREASE: 'cart/increase',
  DECREASE: 'cart/decrease',
  REMOVE: 'cart/remove',
  CLEAR: 'cart/clear',
}

export const initialCart = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: getFinalPrice(product),
            quantity: 1,
          },
        ],
      }
    }
    case CART_ACTIONS.INCREASE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item,
        ),
      }
    case CART_ACTIONS.DECREASE:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case CART_ACTIONS.CLEAR:
      return initialCart
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}

export const getCartTotals = ({ items }) => ({
  totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
})
