import Card from 'react-bootstrap/Card'
import CourseTable from '../components/CourseTable.jsx'
import { courses } from '../data/courses.js'

const CourseListPage = () => (
  <Card className="content-card">
    <Card.Body className="p-4 p-md-5">
      <p className="page-eyebrow">FER202 · Học phần</p>
      <h1 className="h2 mb-4">Danh sách môn học</h1>
      <CourseTable courses={courses} />
    </Card.Body>
  </Card>
)

export default CourseListPage
