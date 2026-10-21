import { useEffect, useState } from 'react'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

function DeletePost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get(POSTS_URL, {
        params: { _limit: 5 },
        signal: controller.signal,
      })
      .then((response) => setPosts(response.data))
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) {
      return
    }

    setDeleting(true)
    setError(null)
    setMessage('')

    axios
      .delete(`${POSTS_URL}/${id}`)
      .then((response) => {
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== id),
        )
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`)
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setDeleting(false))
  }

  return (
    <section className="container py-3">
      <h2>DELETE – Xóa bài viết</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error && posts.length === 0 ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        <>
          {message && <p className="alert alert-success">{message}</p>}
          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-2">
                #{post.id} – {post.title}{' '}
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  disabled={deleting}
                  onClick={() => handleDelete(post.id)}
                >
                  {deleting ? 'Đang xóa...' : 'Xóa'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default DeletePost
