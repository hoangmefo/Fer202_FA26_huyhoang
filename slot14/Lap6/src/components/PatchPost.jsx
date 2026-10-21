import { useState } from 'react'
import postApi from '../api/postApi'

function PatchPost() {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handlePatch = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await postApi.patch(1, { title })
      setResult({ status: response.status, data: response.data })
    } catch (requestError) {
      setError(requestError.userMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container py-3">
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>
      <form onSubmit={handlePatch}>
        <div className="mb-3">
          <label className="form-label" htmlFor="patch-post-title">
            Tiêu đề mới
          </label>
          <input
            id="patch-post-title"
            className="form-control"
            placeholder="Tiêu đề mới"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting || !title.trim()}
        >
          {submitting ? 'Đang cập nhật...' : 'Cập nhật (PATCH)'}
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

export default PatchPost
