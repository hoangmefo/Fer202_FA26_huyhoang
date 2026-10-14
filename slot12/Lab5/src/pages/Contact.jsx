import { useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

const initialFormState = {
  values: {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  },
  errors: {},
  submitted: false,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^0\d{9}$/

function validateContact(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên.'
  }

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email.'
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Email không đúng định dạng.'
  }

  if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Số điện thoại phải gồm 10 số và bắt đầu bằng 0.'
  }

  if (!values.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung.'
  }

  return errors
}

function contactFormReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const values = { ...state.values, [action.name]: action.value }
      return {
        ...state,
        values,
        errors: state.submitted ? validateContact(values) : state.errors,
      }
    }
    case 'SUBMIT':
      return {
        ...state,
        errors: validateContact(state.values),
        submitted: true,
      }
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}

function Contact() {
  const [form, dispatch] = useReducer(contactFormReducer, initialFormState)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_FIELD', name, value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateContact(form.values)
    dispatch({ type: 'SUBMIT' })

    if (Object.keys(errors).length === 0) {
      setShowModal(true)
    }
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="h3 mb-4">
                Completed Lab5
              </Card.Title>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contact-full-name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={form.values.fullName}
                    onChange={handleChange}
                    isInvalid={Boolean(form.errors.fullName)}
                    placeholder="Nhập họ và tên"
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contact-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={handleChange}
                    isInvalid={Boolean(form.errors.email)}
                    placeholder="name@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contact-phone">
                  <Form.Label>Số điện thoại (không bắt buộc)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.values.phone}
                    onChange={handleChange}
                    isInvalid={Boolean(form.errors.phone)}
                    placeholder="0123456789"
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contact-message">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={form.values.message}
                    onChange={handleChange}
                    isInvalid={Boolean(form.errors.message)}
                    placeholder="Nhập nội dung liên hệ"
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Gửi thông tin</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Completed Lab5</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thông tin đã nhập vào form.</p>
          <dl className="mb-0">
            <dt>Họ và tên</dt>
            <dd>{form.values.fullName}</dd>
            <dt>Email</dt>
            <dd>{form.values.email}</dd>
            <dt>Số điện thoại</dt>
            <dd>{form.values.phone || 'Không cung cấp'}</dd>
            <dt>Nội dung</dt>
            <dd className="mb-0">{form.values.message}</dd>
          </dl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Contact
