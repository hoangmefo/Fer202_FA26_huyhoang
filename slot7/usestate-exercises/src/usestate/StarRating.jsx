import { useState } from 'react';

const LABELS = [
  '',
  'Rất tệ',
  'Tệ',
  'Bình thường',
  'Tốt',
  'Tuyệt vời',
];

function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div>
      <div>
        {Array.from({ length: max }, (_, index) => {
          const star = index + 1;

          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(star === value ? 0 : star)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '40px',
                cursor: 'pointer',
                padding: '0 4px',
                color: star <= display ? '#FFD700' : '#CCCCCC',
              }}
            >
              {star <= display ? '★' : '☆'}
            </button>
          );
        })}
      </div>

      <div style={{ fontWeight: '500', marginTop: '5px' }}>
        {display > 0 ? LABELS[display] : 'Chưa đánh giá'}
      </div>
    </div>
  );
}

export default StarRating;