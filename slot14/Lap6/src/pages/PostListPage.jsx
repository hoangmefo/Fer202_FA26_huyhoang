import { useEffect, useRef, useState } from 'react'
import {
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import postApi, { userApi } from '../api/postApi'
import ConfirmModal from '../components/ConfirmModal'
import ErrorAlert from '../components/common/ErrorAlert'
import useAxios from '../hooks/useAxios'
import useDebounce from '../hooks/useDebounce'
import useFlash from '../hooks/useFlash'

const LIMIT = 5

function readPage(value) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export default function PostListPage() {
  useFlash()
  const { notify } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = readPage(searchParams.get('page'))
  const userId = searchParams.get('userId') ?? ''
  const q = searchParams.get('q') ?? ''

  const changeQuery = (updates) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value === '') next.delete(key)
        else next.set(key, value)
      }
      return next
    })
  }

  const [keyword, setKeyword] = useState(q)
  const debouncedKeyword = useDebounce(keyword.trim(), 500)
  const previousQuery = useRef(q)
  useEffect(() => {
    if (previousQuery.current !== q) {
      previousQuery.current = q
      setKeyword(q)
      return
    }
    if (debouncedKeyword !== keyword.trim()) return
    if (debouncedKeyword !== q) {
      changeQuery({ q: debouncedKeyword, page: '1' })
    }
  }, [debouncedKeyword, keyword, q])

  const {
    data: users,
    error: usersError,
    refetch: refetchUsers,
  } = useAxios((signal) => userApi.getAll(signal), [], { initialData: [] })

  const params = { _page: page, _limit: LIMIT }
  if (userId) params.userId = userId
  if (q) params.q = q

  const {
    data: posts,
    setData: setPosts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll(params, signal),
    [page, userId, q],
    { initialData: [] },
  )

  const [removed, setRemoved] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])
  const [toDelete, setToDelete] = useState(null)
  const [confirmBulk, setConfirmBulk] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [deletingOne, setDeletingOne] = useState(false)

  useEffect(() => {
    setRemoved(0)
    setSelectedIds([])
  }, [page, userId, q])

  const total = Math.max(
    0,
    Number(headers['x-total-count'] ?? posts.length) - removed,
  )
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const authorName = (id) =>
    users.find((user) => String(user.id) === String(id))?.name ??
    `User ${id}`

  useEffect(() => {
    if (!loading && page > totalPages) {
      changeQuery({ page: String(totalPages) })
    }
  }, [loading, page, totalPages])

  const handleDeleteOne = async () => {
    const post = toDelete
    if (!post) return
    setToDelete(null)
    setDeletingOne(true)
    const backup = posts
    setPosts((current) => current.filter((item) => item.id !== post.id))
    setSelectedIds((current) => current.filter((id) => id !== post.id))
    setRemoved((count) => count + 1)

    try {
      const response = await postApi.remove(post.id)
      notify('success', `DELETE /posts/${post.id} → ${response.status}`)
    } catch (requestError) {
      setPosts(backup)
      setRemoved((count) => Math.max(0, count - 1))
      notify(
        'danger',
        `Xóa thất bại (${requestError.userMessage ?? requestError.message}) – đã khôi phục`,
      )
    } finally {
      setDeletingOne(false)
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    )
  }
  const allChecked =
    posts.length > 0 && posts.every((post) => selectedIds.includes(post.id))
  const toggleAll = () => {
    setSelectedIds(
      allChecked ? [] : posts.map((post) => post.id),
    )
  }

  const handleDeleteMany = async () => {
    const ids = [...selectedIds]
    if (ids.length === 0) return

    setBulkDeleting(true)
    try {
      const results = await Promise.allSettled(
        ids.map((id) => postApi.remove(id)),
      )
      const successfulIds = ids.filter(
        (_, index) => results[index].status === 'fulfilled',
      )
      const failedCount = ids.length - successfulIds.length
      setPosts((current) =>
        current.filter((post) => !successfulIds.includes(post.id)),
      )
      setRemoved((count) => count + successfulIds.length)
      setSelectedIds((current) =>
        current.filter((id) => !successfulIds.includes(id)),
      )
      notify(
        failedCount === 0 ? 'success' : 'warning',
        `Xóa thành công ${successfulIds.length}/${ids.length} bài viết`,
      )
    } finally {
      setBulkDeleting(false)
      setConfirmBulk(false)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="m-0">
          Bài viết <Badge bg="secondary">{total}</Badge>
        </h2>
        <div>
          <Button
            variant="danger"
            className="me-2"
            disabled={!selectedIds.length || loading || bulkDeleting || deletingOne}
            onClick={() => setConfirmBulk(true)}
          >
            Xóa đã chọn ({selectedIds.length})
          </Button>
          <Button as={Link} to="/posts/new">
            + Tạo bài viết
          </Button>
        </div>
      </div>

      {usersError && (
        <ErrorAlert message={`Không tải được danh sách tác giả: ${usersError}`} onRetry={refetchUsers} />
      )}
      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>⌕</InputGroup.Text>
            <Form.Control
              placeholder="Tìm bài viết..."
              value={keyword}
              disabled={deletingOne || bulkDeleting}
              onChange={(event) => setKeyword(event.target.value)}
            />
            {keyword && (
              <Button
                variant="outline-secondary"
                disabled={deletingOne || bulkDeleting}
                onClick={() => setKeyword('')}
                aria-label="Xóa từ khóa tìm kiếm"
              >
                ×
              </Button>
            )}
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={userId}
            disabled={loading || deletingOne || bulkDeleting}
            onChange={(event) =>
              changeQuery({ userId: event.target.value, page: '1' })
            }
          >
            <option value="">Tất cả tác giả</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex align-items-center">
          {loading && <Spinner size="sm" role="status" />}
        </Col>
      </Row>

      {error && <ErrorAlert message={error} onRetry={refetch} />}

      <Table
        striped
        bordered
        hover
        responsive
        className={loading ? 'opacity-50' : ''}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Form.Check
                checked={allChecked}
                onChange={toggleAll}
                disabled={loading || deletingOne || bulkDeleting}
                aria-label="Chọn tất cả bài viết trong trang"
              />
            </th>
            <th style={{ width: 60 }}>#</th>
            <th>Tiêu đề</th>
            <th style={{ width: 170 }}>Tác giả</th>
            <th style={{ width: 190 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Form.Check
                  checked={selectedIds.includes(post.id)}
                  onChange={() => toggleSelect(post.id)}
                  disabled={loading || deletingOne || bulkDeleting}
                  aria-label={`Chọn bài viết ${post.id}`}
                />
              </td>
              <td>{post.id}</td>
              <td>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>{authorName(post.userId)}</td>
              <td>
                <Button
                  as={Link}
                  to={`/posts/${post.id}`}
                  size="sm"
                  variant="outline-info"
                  className="me-1"
                >
                  Xem
                </Button>
                <Button
                  as={Link}
                  to={`/posts/${post.id}/edit`}
                  size="sm"
                  variant="outline-primary"
                  className="me-1"
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  disabled={loading || deletingOne || bulkDeleting}
                  onClick={() => setToDelete(post)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
          {!loading && posts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                Không có bài viết phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={page <= 1 || loading || deletingOne || bulkDeleting}
          onClick={() => changeQuery({ page: String(page - 1) })}
        />
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <Pagination.Item
              key={number}
              active={number === page}
              disabled={loading || deletingOne || bulkDeleting}
              onClick={() => changeQuery({ page: String(number) })}
            >
              {number}
            </Pagination.Item>
          ),
        )}
        <Pagination.Next
          disabled={page >= totalPages || loading || deletingOne || bulkDeleting}
          onClick={() => changeQuery({ page: String(page + 1) })}
        />
      </Pagination>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={
          <>
            Xóa <strong>#{toDelete?.id} {toDelete?.title}</strong>?
          </>
        }
        confirmText="Xóa"
        loading={deletingOne}
        onConfirm={handleDeleteOne}
        onCancel={() => setToDelete(null)}
      />
      <ConfirmModal
        show={confirmBulk}
        title="Xóa nhiều bài viết"
        message={`Xóa ${selectedIds.length} bài viết đã chọn (#${selectedIds.join(', #')})?`}
        confirmText="Xóa tất cả"
        loading={bulkDeleting}
        onConfirm={handleDeleteMany}
        onCancel={() => setConfirmBulk(false)}
      />
    </>
  )
}
