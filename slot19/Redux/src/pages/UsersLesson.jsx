import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUser, fetchUsers } from '../features/users/userActions.js'

function UsersLesson() {
  const usersState = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const filteredUsers = useMemo(() => {
    const normalized = keyword.trim().toLowerCase()
    return normalized
      ? usersState.items.filter((user) =>
          `${user.name} ${user.email}`.toLowerCase().includes(normalized),
        )
      : usersState.items
  }, [keyword, usersState.items])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const selectedUser = usersState.items.find(
    (user) => user.id === usersState.selectedId,
  )

  return (
    <div className="lesson-content">
      <p className="text-secondary small mb-3">
        Thunk gọi API ngoài reducer, dispatch request/success/failure và cache danh sách users.
      </p>
      <Row className="g-3">
        <Col lg={5}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="section-label">Redux Thunk · GET /users</div>
              <Form.Control
                className="mb-3"
                placeholder="Tìm tên hoặc email..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              {usersState.loading && (
                <div className="text-center p-4"><Spinner animation="border" /></div>
              )}
              {usersState.error && (
                <Alert variant="danger">
                  {usersState.error}{' '}
                  <Button size="sm" variant="outline-danger" onClick={() => dispatch(fetchUsers())}>
                    Thử lại
                  </Button>
                </Alert>
              )}
              {!usersState.loading && !usersState.error && (
                <ListGroup className="user-list">
                  {filteredUsers.map((user) => (
                    <ListGroup.Item
                      action
                      active={user.id === usersState.selectedId}
                      key={user.id}
                      onClick={() => dispatch(fetchPostsByUser(user.id))}
                    >
                      <strong className="d-block">{user.name}</strong>
                      <small>{user.email} · {user.company.name}</small>
                    </ListGroup.Item>
                  ))}
                  {filteredUsers.length === 0 && (
                    <ListGroup.Item className="text-secondary">Không tìm thấy user.</ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={7}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="section-label">GET /posts?userId=...</div>
              {!selectedUser && <p className="text-secondary mb-0">Chọn một user để xem bài viết.</p>}
              {selectedUser && (
                <h3 className="h6 mb-3">Bài viết của {selectedUser.name}</h3>
              )}
              {usersState.postsLoading && <Spinner animation="border" size="sm" />}
              {usersState.postsError && <Alert variant="danger">{usersState.postsError}</Alert>}
              {!usersState.postsLoading && !usersState.postsError && (
                <div className="user-posts">
                  {usersState.posts.map((post) => (
                    <Card key={post.id} className="mb-2">
                      <Card.Body className="p-3">
                        <Card.Title className="fs-6 text-capitalize">{post.title}</Card.Title>
                        <Card.Text className="small text-secondary mb-0">{post.body}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="small text-secondary mt-3">
        Xem Console để theo dõi action logger; Redux DevTools hiển thị state sau mỗi request.
      </div>
    </div>
  )
}

export default UsersLesson
