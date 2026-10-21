import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'

function RequestConfig() {
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPosts = async () => {
      try {
        const response = await axiosClient({
          method: 'get',
          url: '/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            'X-Client': 'FER202',
          },
          timeout: 5000,
          signal: controller.signal,
        })
        setInfo({
          status: response.status,
          duration: response.duration,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        })
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

  return (
    <section className="container py-3">
      <h2>Cấu hình request</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        <>
          <p>
            Status: {info.status} · {info.duration} ms
          </p>
          <p>Content-Type: {info.contentType}</p>
          <p>Tổng số bài viết (x-total-count): {info.total ?? 'Không có'}</p>
          <ul>
            {info.data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default RequestConfig
