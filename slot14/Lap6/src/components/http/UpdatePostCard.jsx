import { useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import postApi from '../../api/postApi'
import useAxios from '../../hooks/useAxios'
import AsyncContent from '../common/AsyncContent'
import ResultBox from './ResultBox'

const POST_ID = 1

export default function UpdatePostCard() {
  const { data, loading, error, refetch } = useAxios(
    (signal) => postApi.getById(POST_ID, signal),
    [],
  )
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState(null)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const handleUpdate = async (event) => {
    event.preventDefault()
    const validationErrors = {}
    if (form.title.trim().length < 5) {
      validationErrors.title = 'Tiêu đề tối thiểu 5 ký tự'
    }
    if (form.body.trim().length < 10) {
      validationErrors.body = 'Nội dung tối thiểu 10 ký tự'
    }
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSaving(true)
    setSaveError(null)
    try {
      const response = await postApi.update(POST_ID, {
        id: form.id,
        userId: form.userId,
        title: form.title.trim(),
        body: form.body.trim(),
      })
      setResult({
        status: response.status,
        duration: response.duration,
        data: response.data,
      })
    } catch (requestError) {
      setSaveError(requestError.userMessage ?? requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.3 · PUT</strong> /posts/{POST_ID}
      </Card.Header>
      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={data}
          onRetry={refetch}
        >
          {() =>
            form && (
              <Form noValidate onSubmit={handleUpdate}>
                <Form.Control
                  className="mb-2"
                  value={form.title}
                  isInvalid={!!errors.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid" className="mb-2">
                  {errors.title}
                </Form.Control.Feedback>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-2"
                  value={form.body}
                  isInvalid={!!errors.body}
                  onChange={(event) =>
                    setForm({ ...form, body: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid" className="mb-2">
                  {errors.body}
                </Form.Control.Feedback>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <Spinner size="sm" />
                  ) : (
                    'Cập nhật (PUT)'
                  )}
                </Button>
              </Form>
            )
          }
        </AsyncContent>
        {saveError && (
          <Alert variant="danger" className="mt-3 mb-0">
            {saveError}
          </Alert>
        )}
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  )
}
