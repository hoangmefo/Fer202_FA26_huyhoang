import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

function validate(values) {
  const errors = {}
  if (values.title.trim().length < 5) {
    errors.title = 'Tiêu đề tối thiểu 5 ký tự'
  }
  if (values.body.trim().length < 10) {
    errors.body = 'Nội dung tối thiểu 10 ký tự'
  }
  if (!values.userId) {
    errors.userId = 'Chọn tác giả'
  }
  return errors
}

export default function PostForm({
  initialValues,
  users,
  submitting,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      ...values,
      title: values.title.trim(),
      body: values.body.trim(),
      userId: Number(values.userId),
    })
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="post-title">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control
          name="title"
          value={values.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="post-body">
        <Form.Label>Nội dung</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="body"
          value={values.body}
          onChange={handleChange}
          isInvalid={!!errors.body}
        />
        <Form.Control.Feedback type="invalid">
          {errors.body}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="post-user">
        <Form.Label>Tác giả</Form.Label>
        <Form.Select
          name="userId"
          value={values.userId}
          onChange={handleChange}
          isInvalid={!!errors.userId}
        >
          <option value="">-- Chọn tác giả --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.userId}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={submitting} className="me-2">
        {submitting ? (
          <>
            <Spinner size="sm" /> Đang gửi...
          </>
        ) : (
          submitLabel
        )}
      </Button>
      <Button
        type="button"
        variant="outline-secondary"
        onClick={onCancel}
        disabled={submitting}
      >
        Hủy
      </Button>
    </Form>
  )
}
