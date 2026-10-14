import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', session: 'Sáng' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name || !email || !email.includes('@')) {
      setError('Vui lòng nhập họ tên và email hợp lệ (email cần có ký tự @).')
      return
    }

    setError('')
    navigate('/success', {
      state: { name, email, session: form.session },
      replace: true,
    })
  }

  return (
    <Card className="content-card mx-auto" style={{ maxWidth: 680 }}>
      <Card.Body className="p-4 p-md-5">
        <p className="page-eyebrow">FPTU Tech Day 2026</p>
        <h1 className="h2 mb-4">Đăng ký tham dự</h1>
        {error && <Alert variant="danger" role="alert">{error}</Alert>}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="attendee-name">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="attendee-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="attendee-session">
            <Form.Label>Buổi tham dự</Form.Label>
            <Form.Select
              name="session"
              value={form.session}
              onChange={handleChange}
            >
              <option value="Sáng">Sáng</option>
              <option value="Chiều">Chiều</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
            <Button variant="primary" type="submit">Gửi đăng ký</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default RegisterPage
