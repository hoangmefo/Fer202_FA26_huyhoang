import { useEffect, useState } from 'react'
import axios from 'axios'

function AxiosDemo() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get('https://jsonplaceholder.typicode.com/posts/1', {
        signal: controller.signal,
      })
      .then((response) => setData(response.data))
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
