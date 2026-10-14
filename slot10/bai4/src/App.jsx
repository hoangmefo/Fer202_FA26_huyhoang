import { Navigate, Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import EventPage from './pages/EventPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SuccessPage from './pages/SuccessPage.jsx'

const App = () => (
  <Container className="page-shell py-5">
    <Routes>
      <Route path="/" element={<EventPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Container>
)

export default App
