import { useEffect, useState } from 'react'
import { Alert, Badge, Button, Form, Spinner, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearError,
  deleteStudent,
  fetchStudents,
  selectAverageGpa,
  selectStudentsState,
  selectVisibleStudents,
  setKeyword,
  setSortBy,
} from '../features/students/studentsSlice.js'
import StudentFormModal from '../components/StudentFormModal.jsx'

function StudentsLesson() {
  const students = useSelector(selectVisibleStudents)
  const studentsState = useSelector(selectStudentsState)
  const averageGpa = useSelector(selectAverageGpa)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    if (studentsState.status === 'idle') dispatch(fetchStudents())
  }, [dispatch, studentsState.status])

  const openAdd = () => {
    setEditing(null)
    setShowModal(true)
  }

  const openEdit = (student) => {
    setEditing(student)
    setShowModal(true)
  }

  const handleDelete = (student) => {
    if (window.confirm(`Xóa sinh viên ${student.name}?`)) {
      dispatch(deleteStudent(student.id))
    }
  }

  return (
    <div className="lesson-content">
      <p className="text-secondary small mb-3">
        CRUD dùng createAsyncThunk và JSON Server. Chạy bằng <code>npm start</code> để mở cả API lẫn giao diện.
      </p>
      {studentsState.error && studentsState.status !== 'failed' && (
        <Alert variant="warning" dismissible onClose={() => dispatch(clearError())}>
          {studentsState.error}
        </Alert>
      )}
      <div className="student-toolbar">
        <Form.Control
          aria-label="Tìm sinh viên"
          placeholder="Tìm theo tên / mã SV..."
          value={studentsState.keyword}
          onChange={(event) => dispatch(setKeyword(event.target.value))}
        />
        <Form.Select
          aria-label="Sắp xếp sinh viên"
          value={studentsState.sortBy}
          onChange={(event) => dispatch(setSortBy(event.target.value))}
        >
          <option value="code">Sắp xếp: Mã SV</option>
          <option value="name">Sắp xếp: Họ tên</option>
          <option value="gpa">Sắp xếp: GPA ↓</option>
        </Form.Select>
        <Badge bg="info" className="p-2">Tổng: {studentsState.items.length}</Badge>
        <Badge bg="success" className="p-2">GPA TB: {averageGpa}</Badge>
        <Button className="ms-md-auto" onClick={openAdd}>+ Thêm sinh viên</Button>
      </div>

      {studentsState.status === 'loading' && (
        <div className="text-center p-5"><Spinner animation="border" /></div>
      )}
      {studentsState.status === 'failed' && (
        <Alert variant="danger">
          Không tải được dữ liệu: {studentsState.error}. Hãy kiểm tra JSON Server ở cổng 9999.
          <Button
            className="ms-2"
            size="sm"
            onClick={() => dispatch(fetchStudents())}
          >
            Thử lại
          </Button>
        </Alert>
      )}
      {studentsState.status === 'succeeded' && (
        <Table striped bordered hover responsive className="student-table">
          <thead className="table-dark">
            <tr>
              <th>#</th><th>Mã SV</th><th>Họ tên</th><th>Email</th>
              <th className="text-center">GPA</th><th>Ngành</th><th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr><td colSpan={7} className="text-center text-secondary">Không có dữ liệu.</td></tr>
            )}
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.code}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="text-center">
                  <Badge bg={student.gpa >= 8 ? 'success' : student.gpa >= 5 ? 'primary' : 'danger'}>
                    {student.gpa}
                  </Badge>
                </td>
                <td>{student.major}</td>
                <td className="text-center text-nowrap">
                  <Button
                    className="me-1"
                    size="sm"
                    variant="warning"
                    onClick={() => openEdit(student)}
                  >
                    Sửa
                  </Button>
                  <Button
                    disabled={studentsState.saving}
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(student)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <StudentFormModal
        editing={editing}
        onHide={() => setShowModal(false)}
        show={showModal}
      />
    </div>
  )
}

export default StudentsLesson
