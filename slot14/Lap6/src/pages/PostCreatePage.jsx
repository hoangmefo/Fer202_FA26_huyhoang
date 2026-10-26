import { useState } from 'react'
import { Alert, Card } from 'react-bootstrap'
import { useNavigate, useOutletContext } from 'react-router-dom'
import postApi, { userApi } from '../api/postApi'
import PostForm from '../components/PostForm'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useAxios from '../hooks/useAxios'

export default function PostCreatePage() {
  const navigate = useNavigate()
  const { notify } = useOutletContext()
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useAxios((signal) => userApi.getAll(signal), [], { initialData: [] })
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (values) => {
    setSubmitting(true)
    try {
      const response = await postApi.create(values)
      navigate('/posts', {
        state: {
          flash: {
            bg: 'success',
            message: `POST /posts → ${response.status}. Đã tạo bài viết #${response.data.id}: "${response.data.title}"`,
          },
        },
      })
    } catch (requestError) {
      notify(
        'danger',
        `Tạo thất bại: ${requestError.userMessage ?? requestError.message}`,
      )
      setSubmitting(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">Tạo bài viết (POST)</Card.Header>
      <Card.Body>
        {loading && <LoadingSpinner />}
        {error && <Alert variant="danger">{error} <button className="btn btn-link p-0" onClick={refetch}>Thử lại</button></Alert>}
        {!loading && !error && (
          <PostForm
            initialValues={{ title: '', body: '', userId: '' }}
            users={users}
            submitting={submitting}
            submitLabel="Tạo bài viết"
            onSubmit={handleCreate}
            onCancel={() => navigate('/posts')}
          />
        )}
      </Card.Body>
    </Card>
  )
}
