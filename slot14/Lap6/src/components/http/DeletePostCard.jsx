import { useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import postApi from '../../api/postApi'
import useAxios from '../../hooks/useAxios'
import ConfirmModal from '../ConfirmModal'
import AsyncContent from '../common/AsyncContent'

export default function DeletePostCard() {
  const { notify } = useOutletContext()
  const { data: posts, setData: setPosts, loading, error, refetch } = useAxios(
    (signal) => postApi.getAll({ _limit: 5 }, signal),
    [],
    { initialData: [] },
  )
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await postApi.remove(toDelete.id)
      setPosts((current) =>
        current.filter((post) => post.id !== toDelete.id),
      )
      notify('success', `DELETE /posts/${toDelete.id} → ${response.status}`)
      setToDelete(null)
    } catch (requestError) {
      notify(
        'danger',
        `Xóa thất bại: ${requestError.userMessage ?? requestError.message}`,
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.5 · DELETE</strong> /posts/:id
      </Card.Header>
      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={posts}
          onRetry={refetch}
          emptyText="Không có bài viết để xóa"
        >
          {(items) => (
            <ListGroup variant="flush">
              {items.map((post) => (
                <ListGroup.Item
                  key={post.id}
                  className="d-flex justify-content-between align-items-center gap-2"
                >
                  <span>
                    #{post.id} – {post.title}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setToDelete(post)}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </AsyncContent>
      </Card.Body>
      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={`Xóa bài viết #${toDelete?.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </Card>
  )
}
