import { Navigate, Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CourseDetailPage from './pages/CourseDetailPage.jsx'
import CourseListPage from './pages/CourseListPage.jsx'

const App = () => (
  <Container className="page-shell py-5">
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/courses/:code" element={<CourseDetailPage />} />
      <Route path="*" element={<Navigate to="/courses" replace />} />
    </Routes>
  </Container>
)

export default App
