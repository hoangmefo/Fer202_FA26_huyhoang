import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import StudentFilters from '../components/StudentFilters.jsx'
import StudentTable from '../components/StudentTable.jsx'
import { classes, students } from '../data/students.js'

const StudentDirectoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const selectedClass = searchParams.get('class') ?? ''

  const updateParam = (key, value, replace = false) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        const normalizedValue = value.trim()
        if (normalizedValue) next.set(key, normalizedValue)
        else next.delete(key)
        return next
      },
      { replace },
    )
  }

  const normalizedQuery = query.trim().toLowerCase()
  const results = students.filter((student) => {
    const matchesQuery =
      !normalizedQuery ||
      student.name.toLowerCase().includes(normalizedQuery) ||
      student.id.toLowerCase().includes(normalizedQuery)
    const matchesClass = !selectedClass || student.className === selectedClass
    return matchesQuery && matchesClass
  })

  return (
    <Container className="page-shell py-5">
      <Card className="content-card">
        <Card.Body className="p-4 p-md-5">
          <p className="page-eyebrow">FER202 · Sinh viên</p>
          <h1 className="h2 mb-2">Danh bạ sinh viên</h1>
          <p className="text-secondary mb-4">
            Tìm theo họ tên hoặc MSSV, hoặc lọc danh sách theo lớp.
          </p>
          <StudentFilters
            query={query}
            selectedClass={selectedClass}
            classes={classes}
            onQueryChange={(value) => updateParam('q', value, true)}
            onClassChange={(value) => updateParam('class', value)}
          />
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <p className="mb-0 fw-semibold" aria-live="polite">
              Tìm thấy {results.length}/{students.length} sinh viên
            </p>
            <Button variant="outline-secondary" size="sm" onClick={() => setSearchParams({})}>
              Xóa lọc
            </Button>
          </div>
          <StudentTable students={results} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default StudentDirectoryPage
