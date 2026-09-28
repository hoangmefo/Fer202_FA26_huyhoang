import { useState } from 'react'
import Form from 'react-bootstrap/Form'

function ColorSwitcher() {
  const [color, setColor] = useState('white')

  const handleColorChange = (event) => {
    setColor(event.target.value)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Color Switcher</h2>

        <Form.Group>
          <Form.Label>Select a color</Form.Label>

          <Form.Select value={color} onChange={handleColorChange}>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </Form.Select>
        </Form.Group>

        <div
          className="mt-3 border rounded"
          style={{
            height: '150px',
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

export default ColorSwitcher