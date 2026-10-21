import { useEffect, useState } from 'react'
import postApi from '../api/postApi'

function AxiosDemo() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPost = async () => {
      try {
        const response = await postApi.getById(1, controller.signal)
        setData(response.data)
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

  return (
    <section className="container py-3">
      <h2>Axios Demo</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        <>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </>
      )}
    </section>
  )
}

export default AxiosDemo
