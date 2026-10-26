import { useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import postApi from '../../api/postApi'
import ResultBox from './ResultBox'

export default function CreatePostCard() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = {}
    if (title.trim().length < 5) {
      validationErrors.title = 'Tiêu đề tối thiểu 5 ký tự'
    }
    if (body.trim().length < 10) {
      validationErrors.body = 'Nội dung tối thiểu 10 ký tự'
    }
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setError(null)
    setResult(null)
    try {
      const response = await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      })
      setResult({
        status: response.status,
        duration: response.duration,
        data: response.data,
      })
      setTitle('')
      setBody('')
    } catch (requestError) {
      setError(requestError.userMessage ?? requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.2 · POST</strong> /posts
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Control
            className="mb-2"
            placeholder="Tiêu đề (tối thiểu 5 ký tự)"
            value={title}
            isInvalid={!!errors.title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Control.Feedback type="invalid" className="mb-2">
            {errors.title}
          </Form.Control.Feedback>
          <Form.Control
            as="textarea"
            rows={2}
            className="mb-2"
            placeholder="Nội dung (tối thiểu 10 ký tự)"
            value={body}
            isInvalid={!!errors.body}
            onChange={(event) => setBody(event.target.value)}
          />
          <Form.Control.Feedback type="invalid" className="mb-2">
            {errors.body}
          </Form.Control.Feedback>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner size="sm" /> Đang gửi...
              </>
            ) : (
              'Tạo bài viết'
            )}
          </Button>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        )}
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  )
}
