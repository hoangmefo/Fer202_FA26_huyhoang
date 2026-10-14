import Table from 'react-bootstrap/Table'

const StudentTable = ({ students }) => (
  <div className="table-responsive">
    <Table striped hover className="align-middle mb-0">
      <thead>
        <tr><th>MSSV</th><th>Họ tên</th><th>Lớp</th><th>GPA</th></tr>
      </thead>
      <tbody>
        {students.length ? students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td className="fw-semibold">{student.name}</td>
            <td>{student.className}</td>
            <td>{student.gpa.toFixed(2)}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan={4} className="text-center text-secondary py-4">
              Không có sinh viên phù hợp.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default StudentTable
