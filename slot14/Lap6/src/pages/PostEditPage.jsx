import { useState } from 'react'
import { Alert, Card } from 'react-bootstrap'
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom'
import postApi, { userApi } from '../api/postApi'
import PostForm from '../components/PostForm'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useAxios from '../hooks/useAxios'

async function loadEditData(id, signal) {
  const [postResponse, usersResponse] = await Promise.all([
    postApi.getById(id, signal),
    userApi.getAll(signal),
  ])
  return {
    data: { post: postResponse.data, users: usersResponse.data },
  }
}

export default function PostEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useOutletContext()
  const { data, loading, error, refetch } = useAxios(
    (signal) => loadEditData(id, signal),
    [id],
  )
  const [submitting, setSubmitting] = useState(false)

  const handleUpdate = async (values) => {
    setSubmitting(true)
    try {
      const response = await postApi.update(id, {
        id: Number(id),
        ...values,
      })
      navigate(`/posts/${id}`, {
        state: {
          flash: {
            bg: 'success',
            message: `PUT /posts/${id} → ${response.status}. Đã cập nhật bài viết.`,
          },
        },
      })
    } catch (requestError) {
      notify(
        'danger',
        `Cập nhật thất bại: ${requestError.userMessage ?? requestError.message}`,
      )
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <Alert variant="danger">
        {error}{' '}
        <Alert.Link as={Link} to="/posts">
          Về danh sách
        </Alert.Link>{' '}
        <button className="btn btn-link p-0" onClick={refetch}>
          Thử lại
        </button>
      </Alert>
    )
  }

  const { post, users } = data
  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">Sửa bài viết #{id} (PUT)</Card.Header>
      <Card.Body>
        <PostForm
          initialValues={{
            title: post.title,
            body: post.body,
            userId: String(post.userId),
          }}
          users={users}
          submitting={submitting}
          submitLabel="Lưu thay đổi"
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/posts/${id}`)}
        />
      </Card.Body>
    </Card>
  )
}
