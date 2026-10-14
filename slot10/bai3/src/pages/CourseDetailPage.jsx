import { Link, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { findCourse } from '../data/courses.js'

const CourseDetailPage = () => {
  const { code = '' } = useParams()
  const course = findCourse(code)

  if (!course) {
    return (
      <Alert variant="danger" className="content-card p-4">
        <Alert.Heading>Không tìm thấy môn học có mã {code}</Alert.Heading>
        <Button as={Link} to="/courses" variant="outline-danger">
          Quay lại danh sách
        </Button>
      </Alert>
    )
  }

  return (
    <Card className="content-card">
      <Card.Body className="p-4 p-md-5">
        <p className="page-eyebrow">Chi tiết học phần</p>
        <span className="badge text-bg-primary mb-2">{course.code}</span>
        <h1 className="h2">{course.name}</h1>
        <dl className="row mt-4">
          <dt className="col-sm-3">Mã môn học</dt>
          <dd className="col-sm-9">{course.code}</dd>
          <dt className="col-sm-3">Học kỳ</dt>
          <dd className="col-sm-9">{course.semester}</dd>
          <dt className="col-sm-3">Số tín chỉ</dt>
          <dd className="col-sm-9">{course.credits}</dd>
          <dt className="col-sm-3">Mô tả</dt>
          <dd className="col-sm-9">{course.desc}</dd>
        </dl>
        <Button as={Link} to="/courses" variant="outline-primary">
          ← Quay lại danh sách
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CourseDetailPage
