import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function TodoList() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (todo.trim() === '') {
      return
    }

    setTodos([...todos, todo.trim()])
    setTodo('')
  }

  const handleDelete = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete))
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Todo List</h2>

        <Form onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
              placeholder="Enter a todo..."
            />

            <Button variant="success" type="submit">
              Add
            </Button>
          </div>
        </Form>

        <div className="mt-3">
          {todos.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
            >
              <span>{item}</span>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList