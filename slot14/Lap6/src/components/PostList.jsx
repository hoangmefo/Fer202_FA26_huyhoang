import { useEffect, useState } from 'react'
import postApi from '../api/postApi'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll(
          { userId: 1, _limit: 5 },
          controller.signal,
        )
        setPosts(response.data)
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

    fetchPosts()

    return () => controller.abort()
  }, [])

  if (loading) {
    return <div className="container py-3">Loading...</div>
  }

  if (error) {
    return (
      <div className="container py-3" role="alert">
        Error: {error}
      </div>
    )
  }

  return (
    <main className="container py-3">
      <h2>GET – Danh sách bài viết của user 1</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            #{post.id} – {post.title}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default PostList
