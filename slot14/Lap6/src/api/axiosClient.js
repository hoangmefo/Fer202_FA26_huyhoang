import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

export function getErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'Kết nối quá chậm (timeout)'
  }

  if (error.response) {
    const { status } = error.response

    if (status === 404) {
      return 'Không tìm thấy dữ liệu (404)'
    }
    if (status >= 500) {
      return `Máy chủ lỗi (${status})`
    }
    return `Yêu cầu không hợp lệ (${status})`
  }

  if (error.request) {
    return 'Không kết nối được server'
  }

  return error.message
}

axiosClient.interceptors.request.use((config) => {
  config.metadata = { start: performance.now() }

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  console.log(`➡️ ${config.method.toUpperCase()} ${config.url}`)
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    response.duration = Math.round(
      performance.now() - response.config.metadata.start,
    )
    console.log(
      `✅ ${response.status} ${response.config.url} (${response.duration}ms)`,
    )
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('🚫 Canceled', error.config?.url)
    } else {
      error.userMessage = getErrorMessage(error)
      console.warn('❌', error.config?.url, error.userMessage)
    }

    return Promise.reject(error)
  },
)

export default axiosClient
