import { useEffect, useState } from 'react'
import axios from 'axios'

function RequestConfig() {
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: { _page: 1, _limit: 3 },
      headers: {
        Accept: 'application/json',
        Authorization: '******',
      },
      timeout: 5000,
      signal: controller.signal,
    })
      .then((response) => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        })
      })
      .catch((requestError) => {
        if (axios.isCancel(requestError)) {
          return
        }

        if (requestError.code === 'ECONNABORTED') {
          setError('Request quá thời gian (timeout)')
        } else if (requestError.response) {
          setError(`Server trả lỗi ${requestError.response.status}`)
        } else {
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
          <p>Status: {info.status}</p>
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
