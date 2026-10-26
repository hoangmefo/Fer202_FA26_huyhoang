import { useState } from 'react'
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import postApi from '../api/postApi'
import useAxios from '../hooks/useAxios'
import AsyncContent from '../components/common/AsyncContent'

export default function AxiosDemoPage() {
  const [postId, setPostId] = useState(1)
  const { data, headers, loading, error, refetch } = useAxios(
    (signal) => postApi.getById(postId, signal),
    [postId],
  )

  const changePostId = (nextId) => {
    setPostId(Math.min(100, Math.max(1, nextId)))
  }

  return (
    <>
      <h1 className="mb-3">
        Axios Demo <Badge bg="primary">React + Axios</Badge>
      </h1>
      <Row className="mb-3 g-2 align-items-end">
        <Col xs="auto">
          <Form.Label htmlFor="post-id">
            Post ID (1–100; thử 999 để xem lỗi 404)
          </Form.Label>
          <Form.Control
            id="post-id"
            type="number"
            min={1}
            max={100}
            value={postId}
            onChange={(event) =>
              setPostId(Math.max(1, Number(event.target.value) || 1))
            }
            style={{ width: 180 }}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-secondary"
            onClick={() => changePostId(postId - 1)}
            disabled={postId <= 1}
          >
            ‹ Trước
          </Button>{' '}
          <Button
            variant="outline-secondary"
            onClick={() => changePostId(postId + 1)}
            disabled={postId >= 100}
          >
            Sau ›
          </Button>
        </Col>
      </Row>
      <AsyncContent
        loading={loading}
        error={error}
        data={data}
        onRetry={refetch}
      >
        {(post) => (
          <Card className="shadow-sm">
            <Card.Header>
              Post #{post.id} · userId {post.userId}
            </Card.Header>
            <Card.Body>
              <Card.Title as="h2" className="fs-4 text-capitalize">
                {post.title}
              </Card.Title>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>
                {post.body}
              </Card.Text>
              <Link to={`/posts/${post.id}`}>
                Xem chi tiết và bình luận →
              </Link>
            </Card.Body>
            <Card.Footer className="small text-muted">
              Status <Badge bg="success">{headers.status}</Badge> ·{' '}
              {headers.duration} ms · {headers.contentType}
            </Card.Footer>
          </Card>
        )}
      </AsyncContent>
    </>
  )
}
