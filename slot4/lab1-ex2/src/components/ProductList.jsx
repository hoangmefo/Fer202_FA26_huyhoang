import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Mảng danh sách các món Pizza mẫu
const pizzas = [
  { id: 1, name: 'Margherita', price: 10.99, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Pepperoni', price: 12.99, image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Hawaiian', price: 11.99, image: 'https://via.placeholder.com/200' },
  { id: 4, name: 'Seafood', price: 14.99, image: 'https://via.placeholder.com/200' },
];

function ProductList() {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Danh sách Pizza</h2>
      <Row>
        {pizzas.map((pizza) => (
          <Col key={pizza.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={pizza.image} />
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>Giá: ${pizza.price}</Card.Text>
                <Button variant="primary">Đặt hàng</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;