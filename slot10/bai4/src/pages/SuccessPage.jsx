import { Link, Navigate, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const SuccessPage = () => {
  const { state } = useLocation()

  if (!state?.name || !state?.email || !state?.session) {
    return <Navigate to="/register" replace />
  }

  return (
    <Card className="content-card mx-auto" style={{ maxWidth: 680 }}>
      <Card.Body className="p-4 p-md-5">
        <span className="badge text-bg-success mb-3">Đăng ký thành công</span>
        <h1 className="h2">Cảm ơn {state.name}</h1>
        <p className="text-secondary">
          Vé tham dự buổi <strong>{state.session}</strong> đã được gửi tới{' '}
          <strong>{state.email}</strong>.
        </p>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <Button as={Link} to="/register">Đăng ký thêm người khác</Button>
          <Button as={Link} to="/" variant="outline-primary">
            Về trang sự kiện
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default SuccessPage
