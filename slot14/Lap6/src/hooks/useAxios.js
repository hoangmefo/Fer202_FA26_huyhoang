import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function useAxios(
  requestFn,
  deps = [],
  { enabled = true, initialData = null } = {},
) {
  const [data, setData] = useState(initialData)
  const [headers, setHeaders] = useState({})
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [doneKey, setDoneKey] = useState(null)
  const key = JSON.stringify([...deps, reloadKey])

  useEffect(() => {
    if (!enabled) return undefined

    const controller = new AbortController()
    const run = async () => {
      setError(null)
      try {
        const response = await requestFn(controller.signal)
        setData(response.data)
        setHeaders({
          ...(response.headers ?? {}),
          status: response.status,
          duration: response.duration,
          contentType: response.headers?.['content-type'],
        })
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError(requestError.userMessage ?? requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setDoneKey(key)
        }
      }
    }

    run()
    return () => controller.abort()
    // requestFn is intentionally excluded; callers list its inputs in deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  const refetch = useCallback(() => setReloadKey((current) => current + 1), [])
  const loading = enabled && doneKey !== key

  return { data, setData, headers, loading, error, refetch }
}
