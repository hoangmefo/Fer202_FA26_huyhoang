import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const EventPage = () => {
  const navigate = useNavigate()

  return (
    <Card className="hero-panel">
      <Card.Body className="p-4 p-md-5">
        <p className="text-white-50 text-uppercase small fw-semibold">
          Sự kiện công nghệ · 2026
        </p>
        <h1 className="display-5 fw-bold">FPTU Tech Day 2026</h1>
        <p className="lead text-white-50 col-lg-8 mt-3 mb-4">
          Một ngày kết nối cộng đồng công nghệ, khám phá ý tưởng mới và chia sẻ
          hành trình sáng tạo.
        </p>
        <Button
          variant="light"
          className="fw-semibold"
          onClick={() => navigate('/register')}
        >
          Đăng ký ngay
        </Button>
      </Card.Body>
    </Card>
  )
}

export default EventPage
