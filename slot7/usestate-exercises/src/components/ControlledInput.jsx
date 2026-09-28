import { useState } from 'react'
import Form from 'react-bootstrap/Form'

function ControlledInput() {
  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Controlled Input</h2>

        <Form.Group>
          <Form.Label>Enter some text</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Type something..."
          />
        </Form.Group>

        <p className="mt-3 mb-0">
          You typed: <strong>{text}</strong>
        </p>
      </div>
    </div>
  )
}

export default ControlledInput