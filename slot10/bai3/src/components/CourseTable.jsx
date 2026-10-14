import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const CourseTable = ({ courses }) => (
  <div className="table-responsive">
    <Table hover className="align-middle mb-0">
      <thead>
        <tr><th>Mã môn</th><th>Tên môn học</th><th>Tín chỉ</th><th>Học kỳ</th></tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.code}>
            <td>
              <Link className="fw-semibold" to={`/courses/${course.code}`}>
                {course.code}
              </Link>
            </td>
            <td>{course.name}</td>
            <td>{course.credits}</td>
            <td>{course.semester}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default CourseTable
