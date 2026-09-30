import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import StarRating from './StarRating';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const canSubmit = rating > 0 && comment.trim() !== '';

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
    };

    setReviews((current) => [newReview, ...current]);

    setRating(0);
    setComment('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Star Rating</h2>

      <Card className="mb-4">
        <Card.Body>
          <h5>Đánh giá sản phẩm</h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Chọn số sao</Form.Label>

              <StarRating
                value={rating}
                onChange={setRating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bình luận</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập nhận xét của bạn..."
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={!canSubmit}
            >
              Gửi đánh giá
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>Thống kê</h5>

          <p>
            Số lượng đánh giá: <strong>{reviews.length}</strong>
          </p>

          <p>
            Điểm trung bình:{' '}
            <strong>
              {reviews.length > 0
                ? average.toFixed(1)
                : 'Chưa có'}
            </strong>
          </p>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Danh sách đánh giá</h4>

      {reviews.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="mb-3">
            <Card.Body>
              <StarRating
                value={review.rating}
                onChange={() => {}}
              />

              <p className="mt-2 mb-0">
                {review.comment}
              </p>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default ReviewForm;