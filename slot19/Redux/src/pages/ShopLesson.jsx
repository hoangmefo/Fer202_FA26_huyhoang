import { useSelector, useDispatch } from 'react-redux'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
  Table,
} from 'react-bootstrap'
import {
  addToCart,
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../features/cart/cartSlice.js'
import {
  selectFilteredProducts,
  selectKeyword,
  setKeyword,
} from '../features/products/productsSlice.js'

const formatVND = (amount) => `${amount.toLocaleString('vi-VN')} ₫`

function ProductList() {
  const products = useSelector(selectFilteredProducts)
  const keyword = useSelector(selectKeyword)
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  return (
    <>
      <Form.Control
        className="mb-3"
        placeholder="Tìm sản phẩm..."
        value={keyword}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      {products.length === 0 && (
        <p className="text-secondary">Không tìm thấy sản phẩm.</p>
      )}
      <Row xs={1} sm={2} className="g-3">
        {products.map((product) => {
          const quantity = cartItems.find((item) => item.id === product.id)?.quantity ?? 0
          const soldOut = quantity >= product.stock
          return (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  className="product-image"
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
                <Card.Body className="d-flex flex-column">
                  <small className="text-secondary">{product.category} · Kho {product.stock}</small>
                  <Card.Title className="fs-6 mt-1">{product.name}</Card.Title>
                  <strong className="text-danger mb-3">{formatVND(product.price)}</strong>
                  <Button
                    className="mt-auto"
                    disabled={soldOut}
                    onClick={() => dispatch(addToCart(product))}
                  >
                    {soldOut ? 'Đã đạt tối đa' : 'Thêm vào giỏ'}
                    {quantity > 0 && <Badge bg="light" text="dark" className="ms-2">{quantity}</Badge>}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

function Cart() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return <p className="text-secondary mb-0">Giỏ hàng đang trống.</p>
  }

  return (
    <>
      <div className="table-responsive">
        <Table bordered hover size="sm" className="cart-table align-middle">
          <thead>
            <tr><th>Sản phẩm</th><th className="text-center">SL</th><th className="text-end">Thành tiền</th><th /></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">
                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary" onClick={() => dispatch(decreaseQty(item.id))}>−</Button>
                    <Button variant="light" disabled>{item.quantity}</Button>
                    <Button
                      disabled={item.quantity >= item.stock}
                      variant="outline-secondary"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td className="text-end text-nowrap">{formatVND(item.price * item.quantity)}</td>
                <td className="text-center">
                  <Button
                    aria-label={`Xóa ${item.name}`}
                    size="sm"
                    variant="link"
                    className="text-danger p-1"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><th colSpan={2}>Tổng cộng</th><th className="text-end text-danger text-nowrap">{formatVND(total)}</th><th /></tr>
          </tfoot>
        </Table>
      </div>
      <Button size="sm" variant="outline-danger" onClick={() => dispatch(clearCart())}>
        Xóa giỏ hàng
      </Button>
    </>
  )
}

function ShopLesson() {
  const count = useSelector(selectCartCount)

  return (
    <div className="lesson-content">
      <p className="text-secondary small mb-3">
        Hai slice độc lập, reducer dùng Immer; giỏ hàng được lưu lại trong localStorage.
      </p>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="section-label mb-0">Redux Toolkit · createSlice</div>
        <span className="fw-semibold">Giỏ hàng <Badge bg="danger" pill>{count}</Badge></span>
      </div>
      <Row className="g-4">
        <Col lg={7}><ProductList /></Col>
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="h6 mb-3">Giỏ hàng của bạn</h3>
              <Cart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShopLesson
