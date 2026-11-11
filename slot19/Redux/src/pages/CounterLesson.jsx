import { useState } from 'react'
import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../features/counter/counterActions.js'

function CounterLesson() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [step, setStep] = useState('2')
  const stepValue = Number(step)

  return (
    <div className="lesson-content">
      <p className="text-secondary small mb-3">
        Action → dispatch → reducer thuần → store cập nhật → component đọc state.
      </p>
      <Card className="mx-auto shadow-sm" style={{ maxWidth: 480 }}>
        <Card.Body className="p-4 text-center">
          <div className="section-label">Redux thuần · useSelector / useDispatch</div>
          <div className="counter-value" aria-live="polite">{count}</div>
          <Badge bg={count % 2 === 0 ? 'success' : 'warning'} className="mb-4">
            {count % 2 === 0 ? 'Số chẵn' : 'Số lẻ'}
          </Badge>
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
            <Button variant="outline-danger" onClick={() => dispatch(decrement())}>−</Button>
            <Button onClick={() => dispatch(increment())}>+</Button>
            <Button variant="outline-primary" onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
            <Button variant="outline-secondary" onClick={() => dispatch({ type: 'counter/double' })}>×2</Button>
            <Button variant="light" onClick={() => dispatch(reset())}>Reset</Button>
          </div>
          <InputGroup>
            <Form.Control
              aria-label="Số bước"
              min="0"
              type="number"
              value={step}
              onChange={(event) => setStep(event.target.value)}
            />
            <Button
              variant="dark"
              disabled={!Number.isFinite(stepValue) || stepValue <= 0}
              onClick={() => dispatch(incrementByAmount(stepValue))}
            >
              Cộng {step || 0}
            </Button>
          </InputGroup>
          <div className="text-secondary small mt-3">
            Reducer chặn giá trị âm; Redux DevTools hiển thị từng action.
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CounterLesson
