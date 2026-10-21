import { useEffect, useState } from 'react'
import postApi from '../api/postApi'

const POST_ID = 1

function UpdatePost() {
  const [post, setPost] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPost = async () => {
      try {
        const response = await postApi.getById(POST_ID, controller.signal)
        setPost(response.data)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.userMessage)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPost()

    return () => controller.abort()
  }, [])

  const handleUpdate = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await postApi.update(POST_ID, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      })
      setResult({ status: response.status, data: response.data })
    } catch (requestError) {
      setError(requestError.userMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="container py-3">
        <h2>PUT – Cập nhật bài viết</h2>
        <p>Loading...</p>
      </section>
    )
  }

  if (error && !post) {
    return (
      <section className="container py-3">
        <h2>PUT – Cập nhật bài viết</h2>
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </section>
    )
  }

  return (
    <section className="container py-3">
      <h2>PUT – Cập nhật bài viết #{post.id}</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label" htmlFor="update-post-title">
            Title
          </label>
          <input
            id="update-post-title"
            className="form-control"
            value={post.title}
            onChange={(event) =>
              setPost((currentPost) => ({
                ...currentPost,
                title: event.target.value,
              }))
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="update-post-body">
            Body
          </label>
          <textarea
            id="update-post-body"
            className="form-control"
            rows="3"
            value={post.body}
            onChange={(event) =>
              setPost((currentPost) => ({
                ...currentPost,
                body: event.target.value,
              }))
            }
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Đang cập nhật...' : 'Cập nhật (PUT)'}
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

export default UpdatePost
