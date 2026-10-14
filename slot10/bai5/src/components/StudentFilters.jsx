import Form from 'react-bootstrap/Form'

const StudentFilters = ({ query, selectedClass, classes, onQueryChange, onClassChange }) => (
  <>
    <div className="row g-3 mb-4">
      <Form.Group className="col-md-7" controlId="student-search">
        <Form.Label>Tìm sinh viên</Form.Label>
        <Form.Control
          type="search"
          placeholder="Nhập tên hoặc MSSV..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="col-md-5" controlId="student-class">
        <Form.Label>Lớp</Form.Label>
        <Form.Select
          value={selectedClass}
          onChange={(event) => onClassChange(event.target.value)}
        >
          <option value="">Tất cả lớp</option>
          {classes.map((className) => (
            <option key={className} value={className}>{className}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  </>
)

export default StudentFilters
