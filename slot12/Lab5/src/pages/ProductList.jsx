import { useReducer } from 'react'
import Badge from 'react-bootstrap/Badge'
import CartSummary from '../components/CartSummary.jsx'
import ProductFilter from '../components/ProductFilter.jsx'
import products from '../data/products.js'
import {
  CART_ACTIONS,
  cartReducer,
  getCartTotals,
  initialCart,
} from '../reducers/cartReducer.js'

function ProductList() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const { totalQuantity } = getCartTotals(cart)

  const handleAddToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: product })
  }

  return (
    <>
      <ProductFilter products={products} onAddToCart={handleAddToCart} />
      <section className="mt-5" aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="h3 mb-3">
          Giỏ hàng <Badge bg="primary">{totalQuantity}</Badge>
        </h2>
        <CartSummary cart={cart} dispatch={dispatch} />
      </section>
    </>
  )
}

export default ProductList
