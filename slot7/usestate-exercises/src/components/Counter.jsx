import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h2 className="card-title">Simple Counter</h2>

        <p className="fs-4">
          Current count: <strong>{count}</strong>
        </p>

        <Button variant="primary" onClick={handleIncrement}>
          Increment
        </Button>
      </div>
    </div>
  )
}

export default Counter