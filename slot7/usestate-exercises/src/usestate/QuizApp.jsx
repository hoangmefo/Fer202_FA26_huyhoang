import { useState } from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: [
      'useEffect',
      'useState',
      'useRef',
      'useMemo',
    ],
    answer: 1,
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0,
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: [
      'list.push(x)',
      'setList(list.push(x))',
      'setList([...list, x])',
      'list[list.length] = x',
    ],
    answer: 2,
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: [
      'value',
      'checked',
      'selected',
      'defaultValue',
    ],
    answer: 1,
  },
];

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [
      result[j],
      result[i],
    ];
  }

  return result;
}

function Quiz({ onRestart }) {
  const [questions] = useState(() =>
    shuffle(QUESTIONS)
  );

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const selected = answers[current.id];

  const answeredCount =
    Object.keys(answers).length;

  const score = questions.filter(
    (question) =>
      answers[question.id] === question.answer
  ).length;

  const handleAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex,
    }));
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  const handleNext = () => {
    if (selected === undefined) {
      return;
    }

    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="container mt-4">
        <Card>
          <Card.Body>
            <h2 className="mb-4">
              Kết quả bài Quiz
            </h2>

            <h4 className="mb-4">
              Bạn đúng {score}/{questions.length} câu
            </h4>

            {questions.map((question, questionIndex) => {
              const userAnswer =
                answers[question.id];

              const isCorrect =
                userAnswer === question.answer;

              return (
                <Card
                  key={question.id}
                  className="mb-3"
                >
                  <Card.Body>
                    <h5>
                      Câu {questionIndex + 1}:{' '}
                      {question.text}
                    </h5>

                    <p
                      className={
                        isCorrect
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      <strong>
                        {isCorrect
                          ? '✓ Đúng'
                          : '✗ Sai'}
                      </strong>
                    </p>

                    <p>
                      Đáp án đúng:{' '}
                      <strong>
                        {
                          question.options[
                            question.answer
                          ]
                        }
                      </strong>
                    </p>

                    {!isCorrect && (
                      <p>
                        Bạn chọn:{' '}
                        <strong>
                          {
                            question.options[
                              userAnswer
                            ]
                          }
                        </strong>
                      </p>
                    )}
                  </Card.Body>
                </Card>
              );
            })}

            <Button
              variant="primary"
              onClick={onRestart}
            >
              Làm lại
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">
            Câu {index + 1}: {current.text}
          </h2>

          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span>Tiến độ</span>

              <span>
                {answeredCount}/{questions.length}
              </span>
            </div>

            <ProgressBar
              now={
                (answeredCount / questions.length) * 100
              }
            />
          </div>

          <div className="mb-4">
            {current.options.map(
              (option, optionIndex) => {
                const isSelected =
                  selected === optionIndex;

                return (
                  <div
                    key={optionIndex}
                    onClick={() =>
                      handleAnswer(optionIndex)
                    }
                    style={{
                      padding: '15px',
                      marginBottom: '10px',
                      border: isSelected
                        ? '2px solid #0d6efd'
                        : '1px solid #dee2e6',
                      borderRadius: '8px',
                      backgroundColor: isSelected
                        ? '#e7f1ff'
                        : '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        name={current.id}
                        checked={isSelected}
                        onChange={() =>
                          handleAnswer(optionIndex)
                        }
                        style={{
                          marginRight: '10px',
                          cursor: 'pointer',
                        }}
                      />

                      <span>{option}</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={index === 0}
            >
              ← Trước
            </Button>

            {index < questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={selected === undefined}
              >
                Tiếp →
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleNext}
                disabled={
                  answeredCount !== questions.length
                }
              >
                Nộp bài
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <div>
      <div className="container mt-4">
        <h3 className="mb-3">
          Lượt làm bài thứ {attempt}
        </h3>
      </div>

      <Quiz
        key={attempt}
        onRestart={() =>
          setAttempt((a) => a + 1)
        }
      />
    </div>
  );
}

export default QuizApp;