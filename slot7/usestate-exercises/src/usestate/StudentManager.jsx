import { useState } from 'react';
import { Card, Form, Button, Table, Badge } from 'react-bootstrap';

const CITIES = [
  'Hà Nội',
  'Đà Nẵng',
  'TP.HCM',
  'Cần Thơ',
];

const initialStudents = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    score: 8.5,
    contact: {
      city: 'Hà Nội',
    },
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    score: 4.5,
    contact: {
      city: 'Đà Nẵng',
    },
  },
  {
    id: 3,
    name: 'Lê Minh Châu',
    score: 6,
    contact: {
      city: 'TP.HCM',
    },
  },
];

function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const addStudent = (e) => {
    e.preventDefault();

    const name = newName.trim();

    if (name.length < 3) {
      return;
    }

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        score: 0,
        contact: {
          city: CITIES[0],
        },
      },
    ]);

    setNewName('');
  };

  const updateScore = (id, text) => {
    const number = Number(text);

    const score = Math.min(
      10,
      Math.max(0, number)
    );

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              score,
            }
          : s
      )
    );
  };

  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              contact: {
                ...s.contact,
                city,
              },
            }
          : s
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prev) =>
      prev.filter((s) => s.id !== id)
    );
  };

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, s.score + 0.5),
      }))
    );
  };

  const sorted =
    sortBy === 'none'
      ? students
      : [...students].sort((a, b) => {
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name, 'vi');
          }

          if (sortBy === 'score') {
            return b.score - a.score;
          }

          return 0;
        });

  const average =
    students.length === 0
      ? 0
      : students.reduce(
          (sum, student) => sum + student.score,
          0
        ) / students.length;

  const passed = students.filter(
    (student) => student.score >= 5
  ).length;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">
            Quản lý điểm sinh viên
          </h2>

          {/* THÊM SINH VIÊN */}
          <Form
            onSubmit={addStudent}
            className="mb-4"
          >
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Nhập tên sinh viên"
                value={newName}
                onChange={(e) =>
                  setNewName(e.target.value)
                }
              />

              <Button
                type="submit"
                disabled={newName.trim().length < 3}
              >
                Thêm
              </Button>
            </div>
          </Form>

          {/* SẮP XẾP + BONUS */}
          <div className="d-flex gap-2 mb-4">
            <Form.Select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="none">
                Thứ tự nhập
              </option>

              <option value="name">
                Theo tên A → Z
              </option>

              <option value="score">
                Điểm cao → thấp
              </option>
            </Form.Select>

            <Button
              variant="success"
              onClick={bonusAll}
              className="text-nowrap"
            >
              +0.5 cả lớp
            </Button>
          </div>

          {/* BẢNG SINH VIÊN */}
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Điểm</th>
                <th>Thành phố</th>
                <th>Kết quả</th>
                <th>Xóa</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>

                  <td style={{ width: '150px' }}>
                    <Form.Control
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={student.score}
                      onChange={(e) =>
                        updateScore(
                          student.id,
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td style={{ width: '180px' }}>
                    <Form.Select
                      value={student.contact.city}
                      onChange={(e) =>
                        updateCity(
                          student.id,
                          e.target.value
                        )
                      }
                    >
                      {CITIES.map((city) => (
                        <option
                          key={city}
                          value={city}
                        >
                          {city}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  <td>
                    {student.score >= 5 ? (
                      <Badge bg="success">
                        Đạt
                      </Badge>
                    ) : (
                      <Badge bg="danger">
                        Chưa đạt
                      </Badge>
                    )}
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        removeStudent(student.id)
                      }
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* THỐNG KÊ */}
          <div className="mt-3">
            <strong>Sĩ số:</strong> {students.length}
            {' · '}
            <strong>Điểm trung bình:</strong>{' '}
            {average.toFixed(2)}
            {' · '}
            <strong>Đạt:</strong>{' '}
            {passed}/{students.length}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StudentManager;