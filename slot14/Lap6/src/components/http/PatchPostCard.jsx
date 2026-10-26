import { useState } from 'react'
import { Alert, Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap'
import postApi from '../../api/postApi'
import ResultBox from './ResultBox'

export default function PatchPostCard() {
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handlePatch = async (event) => {
    event.preventDefault()
    if (title.trim().length < 5) {
      setError('Tiêu đề tối thiểu 5 ký tự')
      return
    }

    setSaving(true)
    setError(null)
    try {
      const response = await postApi.patch(1, { title: title.trim() })
      setResult({
        status: response.status,
        duration: response.duration,
        data: response.data,
      })
    } catch (requestError) {
      setError(requestError.userMessage ?? requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.4 · PATCH</strong> /posts/1
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handlePatch}>
          <InputGroup>
            <Form.Control
              placeholder="Tiêu đề mới (tối thiểu 5 ký tự)"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              isInvalid={!!error && title.trim().length < 5}
            />
            <Button
              type="submit"
              variant="warning"
              disabled={title.trim().length < 5 || saving}
            >
              {saving ? <Spinner size="sm" /> : 'PATCH'}
            </Button>
          </InputGroup>
          {error && (
            <Alert variant="danger" className="mt-3 mb-0">
              {error}
            </Alert>
          )}
        </Form>
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  )
}
