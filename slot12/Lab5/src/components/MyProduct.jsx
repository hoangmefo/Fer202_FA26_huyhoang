import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import { formatVND, getFinalPrice } from '../utils/format.js'

function MyProduct({ product, onAddToCart }) {
  return (
    <Card className="h-100">
      <div className="position-relative p-3">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: 190, objectFit: 'contain' }}
        />
        {product.discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-3">
            -{product.discount}%
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Stack direction="horizontal" gap={2} className="mb-2">
          <Badge bg="info">{product.category}</Badge>
          <Badge bg={product.instock ? 'success' : 'secondary'}>
            {product.instock ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
        </Stack>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-body-secondary flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="mb-3">
          {product.discount > 0 && (
            <del className="text-body-secondary me-2">
              {formatVND(product.price)}
            </del>
          )}
          <strong>{formatVND(getFinalPrice(product))}</strong>
          <div className="small text-body-secondary">
            Đánh giá: ⭐ {product.rating}/5
          </div>
        </div>
        <Button
          variant="primary"
          className="mt-auto"
          disabled={!product.instock}
          onClick={() => onAddToCart?.(product)}
        >
          {product.instock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default MyProduct
