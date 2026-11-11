import { useMemo, useState } from 'react'
import { Badge, Button, ButtonGroup, Card, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  setFilter,
  toggleTodo,
} from '../features/todos/todoActions.js'
import {
  selectFilter,
  selectRemaining,
  selectTodos,
} from '../features/todos/selectors.js'

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
]

function TodoLesson() {
  const todos = useSelector(selectTodos)
  const filter = useSelector(selectFilter)
  const remaining = useSelector(selectRemaining)
  const dispatch = useDispatch()
  const [newText, setNewText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.done)
    if (filter === 'done') return todos.filter((todo) => todo.done)
    return todos
  }, [todos, filter])

  const handleAdd = (event) => {
    event.preventDefault()
    const text = newText.trim()
    if (!text) return
    dispatch(addTodo(text))
    setNewText('')
  }

  const saveEdit = (todo) => {
    const text = editingText.trim()
    if (text) dispatch(editTodo(todo.id, text))
    setEditingId(null)
  }

  return (
    <div className="lesson-content">
      <p className="text-secondary small mb-3">
        Hai reducer độc lập quản lý <code>state.todos</code> và <code>state.filter</code>.
      </p>
      <Card className="mx-auto shadow-sm" style={{ maxWidth: 640 }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <div className="section-label mb-1">Redux thuần · combineReducers</div>
              <h3 className="h5 mb-0">Danh sách công việc</h3>
            </div>
            <Badge bg="light" text="dark">{remaining} chưa xong</Badge>
          </div>
          <Form onSubmit={handleAdd}>
            <InputGroup>
              <Form.Control
                placeholder="Nhập công việc cần làm..."
                value={newText}
                onChange={(event) => setNewText(event.target.value)}
              />
              <Button type="submit" disabled={!newText.trim()}>Thêm việc</Button>
            </InputGroup>
          </Form>
          <ButtonGroup size="sm" className="my-3">
            {FILTERS.map((item) => (
              <Button
                key={item.key}
                variant={filter === item.key ? 'primary' : 'outline-primary'}
                onClick={() => dispatch(setFilter(item.key))}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
          <ListGroup>
            {visibleTodos.length === 0 && (
              <ListGroup.Item className="text-secondary text-center py-4">
                Không có công việc trong bộ lọc này.
              </ListGroup.Item>
            )}
            {visibleTodos.map((todo) => (
              <ListGroup.Item key={todo.id} className="d-flex align-items-center gap-2">
                <Form.Check
                  aria-label={`Đánh dấu ${todo.text}`}
                  checked={todo.done}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                {editingId === todo.id ? (
                  <Form.Control
                    autoFocus
                    size="sm"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onBlur={() => saveEdit(todo)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') saveEdit(todo)
                      if (event.key === 'Escape') setEditingId(null)
                    }}
                  />
                ) : (
                  <span
                    className={`todo-text flex-grow-1 ${todo.done ? 'completed' : ''}`}
                    onDoubleClick={() => {
                      setEditingId(todo.id)
                      setEditingText(todo.text)
                    }}
                    title="Nhấp đúp để chỉnh sửa"
                  >
                    {todo.text}
                  </span>
                )}
                <Button
                  aria-label={`Xóa ${todo.text}`}
                  size="sm"
                  variant="outline-danger"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-secondary">{todos.length} công việc</small>
            <Button
              size="sm"
              variant="link"
              disabled={!todos.some((todo) => todo.done)}
              onClick={() => dispatch(clearCompleted())}
            >
              Xóa việc đã xong
            </Button>
          </div>
          <small className="text-secondary">Nhấp đúp vào nội dung để sửa.</small>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TodoLesson
