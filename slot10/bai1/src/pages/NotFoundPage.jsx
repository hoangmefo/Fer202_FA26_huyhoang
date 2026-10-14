import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const NotFoundPage = () => (
  <Alert variant="warning" className="content-card p-4">
    <Alert.Heading>Không tìm thấy trang</Alert.Heading>
    <p>Địa chỉ bạn truy cập không tồn tại trong portfolio này.</p>
    <Button as={Link} to="/" variant="outline-primary">
      Về trang chủ
    </Button>
  </Alert>
)

export default NotFoundPage
