import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
  Table,
} from 'react-bootstrap'
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom'
import postApi, { userApi } from '../api/postApi'
import ConfirmModal from '../components/ConfirmModal'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useAxios from '../hooks/useAxios'
import useFlash from '../hooks/useFlash'

async function loadDetail(id, signal) {
  const { data: post } = await postApi.getById(id, signal)
  const [userResult, commentsResult] = await Promise.allSettled([
    userApi.getById(post.userId, signal),
    postApi.getComments(id, signal),
  ])

  if (signal.aborted) {
    throw new axios.CanceledError()
  }

  return {
    data: {
      post,
      author:
        userResult.status === 'fulfilled' ? userResult.value.data : null,
      comments:
        commentsResult.status === 'fulfilled'
          ? commentsResult.value.data
          : [],
      warning:
        userResult.status === 'rejected' ||
        commentsResult.status === 'rejected'
          ? 'Một số thông tin phụ (tác giả / bình luận) không tải được.'
          : null,
    },
  }
}

async function measureRequests(id) {
  let start = performance.now()
  const { data: sequentialPost } = await postApi.getById(id)
  await userApi.getById(sequentialPost.userId)
  await postApi.getComments(id)
  const sequential = Math.round(performance.now() - start)

  start = performance.now()
  const { data: parallelPost } = await postApi.getById(id)
  await Promise.all([
    userApi.getById(parallelPost.userId),
    postApi.getComments(id),
  ])
  const parallel = Math.round(performance.now() - start)

  return { sequential, parallel }
}

export default function PostDetailPage() {
  useFlash()
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useOutletContext()
  const { data, setData, loading, error, refetch } = useAxios(
    (signal) => loadDetail(id, signal),
    [id],
  )

  const [quickTitle, setQuickTitle] = useState('')
  const [patching, setPatching] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [timing, setTiming] = useState(null)
  const [measuring, setMeasuring] = useState(false)

  useEffect(() => {
    if (data) setQuickTitle(data.post.title)
  }, [data])

  const handlePatch = async (event) => {
    event.preventDefault()
    if (quickTitle.trim().length < 5) {
      notify('warning', 'Tiêu đề tối thiểu 5 ký tự')
      return
    }

    setPatching(true)
    try {
      const response = await postApi.patch(id, {
        title: quickTitle.trim(),
      })
      setData((current) => ({
        ...current,
        post: { ...current.post, ...response.data },
      }))
      notify('success', `PATCH /posts/${id} → ${response.status}`)
    } catch (requestError) {
      notify(
        'danger',
        `Cập nhật thất bại: ${requestError.userMessage ?? requestError.message}`,
      )
    } finally {
      setPatching(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await postApi.remove(id)
      navigate('/posts', {
        state: {
          flash: {
            bg: 'success',
            message: `DELETE /posts/${id} → ${response.status}. Đã xóa bài viết.`,
          },
        },
      })
    } catch (requestError) {
      notify(
        'danger',
        `Xóa thất bại: ${requestError.userMessage ?? requestError.message}`,
      )
      setDeleting(false)
      setShowDelete(false)
    }
  }

  const handleMeasure = async () => {
    setMeasuring(true)
    try {
      setTiming(await measureRequests(id))
    } catch (requestError) {
      notify(
        'danger',
        requestError.userMessage ?? requestError.message,
      )
    } finally {
      setMeasuring(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <Alert variant="danger">
        {error} – bài viết #{id}.{' '}
        <Alert.Link as={Link} to="/posts">
          Quay lại danh sách
        </Alert.Link>{' '}
        <Button size="sm" variant="outline-secondary" onClick={refetch}>
          Thử lại
        </Button>
      </Alert>
    )
  }

  const { post, author, comments, warning } = data
  return (
    <>
      <Button
        variant="link"
        className="px-0 mb-2"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </Button>
      {warning && <Alert variant="warning">{warning}</Alert>}

      <Card className="mb-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>
            Post #{post.id} ·{' '}
            <strong>{author?.name ?? `User ${post.userId}`}</strong>
            {author && ` (${author.email})`}
          </span>
          <span>
            <Button
              as={Link}
              to={`/posts/${post.id}/edit`}
              size="sm"
              variant="outline-primary"
              className="me-2"
            >
              Sửa (PUT)
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => setShowDelete(true)}
            >
              Xóa
            </Button>
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Title as="h2" className="fs-3">
            {post.title}
          </Card.Title>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            {post.body}
          </Card.Text>
          <Form onSubmit={handlePatch} className="mt-4">
            <Form.Label htmlFor="quick-title" className="small text-muted">
              Sửa nhanh tiêu đề (PATCH)
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="quick-title"
                value={quickTitle}
                onChange={(event) => setQuickTitle(event.target.value)}
                isInvalid={quickTitle.trim().length > 0 && quickTitle.trim().length < 5}
              />
              <Button
                type="submit"
                variant="warning"
                disabled={
                  patching ||
                  quickTitle.trim().length < 5 ||
                  quickTitle === post.title
                }
              >
                {patching ? <Spinner size="sm" /> : 'PATCH'}
              </Button>
            </InputGroup>
            {quickTitle.trim().length > 0 &&
              quickTitle.trim().length < 5 && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  Tiêu đề tối thiểu 5 ký tự
                </Form.Control.Feedback>
              )}
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>NC3 · So sánh request tuần tự và song song</Card.Header>
        <Card.Body>
          <Button onClick={handleMeasure} disabled={measuring}>
            {measuring ? (
              <>
                <Spinner size="sm" /> Đang đo...
              </>
            ) : (
              'Đo thời gian'
            )}
          </Button>
          {timing && (
            <Table
              size="sm"
              bordered
              className="mt-3 mb-0"
              style={{ maxWidth: 420 }}
            >
              <tbody>
                <tr>
                  <th>Tuần tự (3 request nối tiếp)</th>
                  <td>{timing.sequential} ms</td>
                </tr>
                <tr>
                  <th>Song song (1 + Promise.all)</th>
                  <td>{timing.parallel} ms</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <h4>
        Bình luận <Badge bg="secondary">{comments.length}</Badge>
      </h4>
      <ListGroup className="mb-4">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="fw-semibold">{comment.name}</div>
            <small className="text-muted">{comment.email}</small>
            <div>{comment.body}</div>
          </ListGroup.Item>
        ))}
        {comments.length === 0 && (
          <ListGroup.Item className="text-muted">
            Chưa có bình luận
          </ListGroup.Item>
        )}
      </ListGroup>

      <ConfirmModal
        show={showDelete}
        title="Xóa bài viết"
        message={`Xóa bài viết #${post.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  )
}
