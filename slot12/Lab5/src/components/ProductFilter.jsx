import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import MyProduct from './MyProduct.jsx'
import { getFinalPrice } from '../utils/format.js'

const ALL_CATEGORIES = 'Tất cả'

const sorters = {
  default: () => 0,
  'price-asc': (first, second) =>
    getFinalPrice(first) - getFinalPrice(second),
  'price-desc': (first, second) =>
    getFinalPrice(second) - getFinalPrice(first),
  rating: (first, second) => second.rating - first.rating,
}

function ProductFilter({ products, onAddToCart }) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  const categories = [
    ALL_CATEGORIES,
    ...new Set(products.map((product) => product.category)),
  ]

  const visibleProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(keyword.trim().toLowerCase()),
    )
    .filter(
      (product) =>
        category === ALL_CATEGORIES || product.category === category,
    )
    .filter((product) => !onlyInStock || product.instock)
    .sort(sorters[sortBy])

  const resetFilters = () => {
    setKeyword('')
    setCategory(ALL_CATEGORIES)
    setOnlyInStock(false)
    setSortBy('default')
  }

  return (
    <>
      <h1 className="h4 mb-3">Tìm kiếm, lọc và sắp xếp sản phẩm</h1>
      <Row className="g-2 align-items-center mb-3">
        <Col md={5}>
          <Form.Control
            aria-label="Tìm sản phẩm"
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            aria-label="Sắp xếp sản phẩm"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="rating">Đánh giá cao</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Check
            type="switch"
            id="only-in-stock"
            label="Còn hàng"
            checked={onlyInStock}
            onChange={(event) => setOnlyInStock(event.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={resetFilters}
          >
            Xóa lọc
          </Button>
        </Col>
      </Row>
      <ButtonGroup className="mb-3 flex-wrap">
        {categories.map((name) => (
          <Button
            key={name}
            size="sm"
            variant={name === category ? 'primary' : 'outline-primary'}
            onClick={() => setCategory(name)}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
      <p className="text-body-secondary">
        Tìm thấy {visibleProducts.length}/{products.length} sản phẩm
      </p>
      {visibleProducts.length === 0 ? (
        <Alert variant="warning">Không có sản phẩm phù hợp</Alert>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-3">
          {visibleProducts.map((product) => (
            <Col key={product.id}>
              <MyProduct product={product} onAddToCart={onAddToCart} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default ProductFilter
