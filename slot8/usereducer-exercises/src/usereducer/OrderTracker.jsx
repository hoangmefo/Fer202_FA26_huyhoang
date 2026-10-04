import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

// Máy trạng thái
const TRANSITIONS = {
  pending: {
    CONFIRM: 'confirmed',
    CANCEL: 'cancelled',
  },

  confirmed: {
    SHIP: 'shipping',
    CANCEL: 'cancelled',
  },

  shipping: {
    DELIVER: 'delivered',
  },

  delivered: {},

  cancelled: {},
};

// Thông tin hiển thị của từng trạng thái
const STATUS_INFO = {
  pending: {
    label: 'Chờ xác nhận',
    bg: 'secondary',
  },

  confirmed: {
    label: 'Đã xác nhận',
    bg: 'primary',
  },

  shipping: {
    label: 'Đang giao',
    bg: 'warning',
  },

  delivered: {
    label: 'Đã giao',
    bg: 'success',
  },

  cancelled: {
    label: 'Đã hủy',
    bg: 'danger',
  },
};

// Tên hiển thị của các sự kiện
const EVENT_LABELS = {
  CONFIRM: 'Xác nhận',
  SHIP: 'Giao hàng',
  DELIVER: 'Đã nhận hàng',
  CANCEL: 'Hủy đơn',
};

// State ban đầu
const initialState = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [
    {
      status: 'pending',
      at: '08:00',
    },
  ],
};

// Reducer
const orderReducer = (state, action) => {
  // Cập nhật lý do hủy
  if (action.type === 'SET_REASON') {
    return {
      ...state,
      cancelReason: action.payload,
      error: '',
    };
  }

  // Tạo đơn mới
  if (action.type === 'RESET') {
    return initialState;
  }

  // Tìm trạng thái tiếp theo từ bảng TRANSITIONS
  const nextStatus = TRANSITIONS[state.status][action.type];

  // Sự kiện không hợp lệ
  if (!nextStatus) {
    return {
      ...state,
      error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`,
    };
  }

  // Hủy đơn nhưng lý do chưa đủ 5 ký tự
  if (
    action.type === 'CANCEL' &&
    state.cancelReason.trim().length < 5
  ) {
    return {
      ...state,
      error: 'Nhập lý do hủy (ít nhất 5 ký tự)',
    };
  }

  // Chuyển trạng thái thành công
  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [
      ...state.timeline,
      {
        status: nextStatus,
        at: action.at,
      },
    ],
  };
};

// Lấy thời gian hiện tại
const now = () =>
  new Date().toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

function OrderTracker() {
  const [state, dispatch] = useReducer(
    orderReducer,
    initialState
  );

  const {
    status,
    cancelReason,
    error,
    timeline,
  } = state;

  // Các event được phép ở trạng thái hiện tại
  const allowedEvents = Object.keys(
    TRANSITIONS[status]
  );

  // Kiểm tra trạng thái cuối
  const isFinal = allowedEvents.length === 0;

  return (
    <div className="container py-5">
      <Card
        className="mx-auto shadow"
        style={{ maxWidth: '600px' }}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center mb-4">
            <span>Đơn hàng #DH1024</span>

            <Badge bg={STATUS_INFO[status].bg}>
              {STATUS_INFO[status].label}
            </Badge>
          </Card.Title>

          {/* Hiển thị lỗi */}
          {error && (
            <Alert variant="danger" className="py-2">
              {error}
            </Alert>
          )}

          {/* Ô nhập lý do hủy */}
          {allowedEvents.includes('CANCEL') && (
            <Form.Control
              className="mb-3"
              placeholder="Lý do hủy (bắt buộc khi hủy)"
              value={cancelReason}
              onChange={(e) =>
                dispatch({
                  type: 'SET_REASON',
                  payload: e.target.value,
                })
              }
            />
          )}

          {/* Các nút sự kiện */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {Object.keys(EVENT_LABELS).map((event) => (
              <Button
                key={event}
                size="sm"
                variant={
                  event === 'CANCEL'
                    ? 'outline-danger'
                    : 'outline-primary'
                }
                disabled={!allowedEvents.includes(event)}
                onClick={() =>
                  dispatch({
                    type: event,
                    at: now(),
                  })
                }
              >
                {EVENT_LABELS[event]}
              </Button>
            ))}

            {/* Nút test SHIP */}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() =>
                dispatch({
                  type: 'SHIP',
                  at: now(),
                })
              }
            >
              Thử gửi SHIP
            </Button>
          </div>

          {/* Timeline */}
          <h5 className="mb-3">Lịch sử trạng thái</h5>

          <ListGroup variant="flush">
            {timeline.map(({ status: currentStatus, at }, index) => (
              <ListGroup.Item
                key={`${currentStatus}-${index}`}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <Badge
                    bg={STATUS_INFO[currentStatus].bg}
                    className="me-2"
                  >
                    {STATUS_INFO[currentStatus].label}
                  </Badge>
                </div>

                <small className="text-muted">
                  {at}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Tạo đơn mới */}
          {isFinal && (
            <div className="text-center">
              <Button
                className="mt-4"
                size="sm"
                onClick={() =>
                  dispatch({
                    type: 'RESET',
                  })
                }
              >
                Tạo đơn mới
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrderTracker;