import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h2 className="card-title">Simple Counter</h2>

        <p className="fs-4">
          Current count: <strong>{count}</strong>
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" onClick={handleIncrement}>
            Increase
          </Button>

          <Button variant="danger" onClick={handleDecrement}>
            Decrease
          </Button>

          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Counter