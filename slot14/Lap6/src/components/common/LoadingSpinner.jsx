import { Spinner } from 'react-bootstrap'

export default function LoadingSpinner({ text = 'Đang tải dữ liệu...' }) {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  )
}
