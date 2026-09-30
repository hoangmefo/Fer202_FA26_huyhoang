import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const faqs = [
  {
    id: 1,
    question: 'React là gì?',
    answer:
      'Thư viện JavaScript để xây dựng giao diện người dùng theo component.',
  },
  {
    id: 2,
    question: 'State khác props thế nào?',
    answer:
      'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.',
  },
  {
    id: 3,
    question: 'Vì sao phải dùng setState?',
    answer:
      'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.',
  },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <Card className="mb-3">
      <Card.Header
        role="button"
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <strong>{question}</strong>

        <span className="float-end">
          {isOpen ? '−' : '+'}
        </span>
      </Card.Header>

      {isOpen && <Card.Body>{answer}</Card.Body>}
    </Card>
  );
}

function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [openIds, setOpenIds] = useState([]);

  const handleToggle = (id) => {
    if (singleMode) {
      setOpenId((current) => (current === id ? null : id));
    } else {
      setOpenIds((current) =>
        current.includes(id)
          ? current.filter((itemId) => itemId !== id)
          : [...current, id]
      );
    }
  };

  const handleModeChange = (e) => {
    setSingleMode(e.target.checked);
    setOpenId(null);
    setOpenIds([]);
  };

  const closeAll = () => {
    setOpenId(null);
    setOpenIds([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">FAQ Accordion</h2>

      <Form.Check
        type="switch"
        id="single-mode"
        label="Chỉ mở một câu tại một thời điểm"
        checked={singleMode}
        onChange={handleModeChange}
        className="mb-3"
      />

      {singleMode
        ? faqs.map((faq) => (
            <Card className="mb-3" key={faq.id}>
              <Card.Header
                role="button"
                onClick={() => handleToggle(faq.id)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{faq.question}</strong>

                <span className="float-end">
                  {openId === faq.id ? '−' : '+'}
                </span>
              </Card.Header>

              {openId === faq.id && (
                <Card.Body>{faq.answer}</Card.Body>
              )}
            </Card>
          ))
        : faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIds.includes(faq.id)}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}

      <Button
        variant="secondary"
        onClick={closeAll}
        disabled={
          singleMode ? openId === null : openIds.length === 0
        }
      >
        Đóng tất cả
      </Button>
    </div>
  );
}

export default FaqAccordion;