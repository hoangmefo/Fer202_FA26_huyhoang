import { useState } from 'react'
import postApi from '../api/postApi'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await postApi.create({ title, body, userId: 1 })
      setResult({ status: response.status, data: response.data })
      setTitle('')
      setBody('')
    } catch (requestError) {
      setError(requestError.userMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container py-3">
      <h2>POST – Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="new-post-title">
            Title
          </label>
          <input
            id="new-post-title"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="new-post-body">
            Body
          </label>
          <textarea
            id="new-post-body"
            className="form-control"
            placeholder="Body"
            rows="3"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          Error: {error}
        </div>
      )}
      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}

export default CreatePost
