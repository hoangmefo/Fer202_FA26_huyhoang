import { useEffect, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, clearError, updateStudent } from '../features/students/studentsSlice.js'

const EMPTY_FORM = {
  code: '',
  name: '',
  email: '',
  gpa: '',
  major: 'SE',
}

function validateForm(form) {
  const errors = {}
  if (!/^[A-Z]{2}\d{6}$/i.test(form.code)) {
    errors.code = 'Mã sinh viên có dạng HE170001.'
  }
  if (form.name.trim().length < 2) {
    errors.name = 'Họ tên cần có ít nhất 2 ký tự.'
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Email không hợp lệ.'
  }
  const gpa = Number(form.gpa)
  if (form.gpa === '' || !Number.isFinite(gpa) || gpa < 0 || gpa > 10) {
    errors.gpa = 'GPA phải nằm trong khoảng 0 đến 10.'
  }
  return errors
}

function StudentFormModal({ show, onHide, editing }) {
  const dispatch = useDispatch()
  const saving = useSelector((state) => state.students.saving)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (!show) return
    dispatch(clearError())
    setForm(
      editing
        ? { ...editing, gpa: String(editing.gpa) }
        : { ...EMPTY_FORM },
    )
    setErrors({})
    setServerError('')
  }, [dispatch, editing, show])

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const data = {
      ...form,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim(),
      gpa: Number(form.gpa),
    }

    try {
      if (editing) await dispatch(updateStudent({ ...data, id: editing.id })).unwrap()
      else await dispatch(addStudent(data)).unwrap()
      onHide()
    } catch (error) {
      setServerError(typeof error === 'string' ? error : 'Không thể lưu sinh viên.')
    }
  }

  return (
    <Modal centered onHide={onHide} show={show}>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {serverError && <div className="alert alert-danger py-2">{serverError}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Mã sinh viên</Form.Label>
            <Form.Control
              disabled={Boolean(editing)}
              isInvalid={Boolean(errors.code)}
              name="code"
              onChange={handleChange}
              value={form.code}
            />
            <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.name)}
              name="name"
              onChange={handleChange}
              value={form.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.email)}
              name="email"
              onChange={handleChange}
              type="email"
              value={form.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="flex-fill">
              <Form.Label>GPA</Form.Label>
              <Form.Control
                isInvalid={Boolean(errors.gpa)}
                max="10"
                min="0"
                name="gpa"
                onChange={handleChange}
                step="0.1"
                type="number"
                value={form.gpa}
              />
              <Form.Control.Feedback type="invalid">{errors.gpa}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="flex-fill">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select name="major" onChange={handleChange} value={form.major}>
                <option value="SE">SE — Kỹ thuật phần mềm</option>
                <option value="AI">AI — Trí tuệ nhân tạo</option>
                <option value="IA">IA — An toàn thông tin</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={saving} variant="secondary" onClick={onHide}>Hủy</Button>
          <Button disabled={saving} type="submit">
            {saving && <Spinner className="me-2" size="sm" />}
            {editing ? 'Cập nhật' : 'Thêm sinh viên'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default StudentFormModal
