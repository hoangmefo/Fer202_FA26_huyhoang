import { useReducer } from 'react';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

const MIN = 0;
const MAX = 100;

const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

export const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset',
};

const initialState = {
  count: 0,
  step: 1,
  history: [],
};

export function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta =
        action.type === ACTIONS.INCREMENT ? state.step : -state.step;

      const next = clamp(state.count + delta);

      if (next === state.count) {
        return state;
      }

      return {
        ...state,
        count: next,
        history: [`${state.count} → ${next}`, ...state.history].slice(0, 5),
      };
    }

    case ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function StepCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const { count, step, history } = state;

  return (
    <div className="container py-5">
      <Card className="mx-auto shadow" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <h1 className="text-center mb-4">Step Counter</h1>

          <div className="text-center mb-4">
            <div
              className="display-1 fw-bold"
              style={{ fontSize: '80px' }}
            >
              {count}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 mb-4">
            <Button
              variant="secondary"
              onClick={() =>
                dispatch({ type: ACTIONS.DECREMENT })
              }
              disabled={count === MIN}
            >
              − {step}
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                dispatch({ type: ACTIONS.INCREMENT })
              }
              disabled={count === MAX}
            >
              + {step}
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: ACTIONS.RESET })
              }
            >
              Đặt lại
            </Button>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Bước nhảy
            </Form.Label>

            <Form.Select
              value={step}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.SET_STEP,
                  payload: Number(e.target.value),
                })
              }
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Form.Select>
          </Form.Group>

          <h5>5 thay đổi gần nhất</h5>

          {history.length === 0 ? (
            <p className="text-muted">Chưa có thay đổi</p>
          ) : (
            <ListGroup>
              {history.map((item, index) => (
                <ListGroup.Item key={`${item}-${index}`}>
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default StepCounter;