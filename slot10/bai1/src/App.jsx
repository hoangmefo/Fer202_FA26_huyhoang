import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import AppNavbar from './components/layout/AppNavbar.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'

const App = () => (
  <>
    <AppNavbar />
    <Container className="page-shell py-5">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  </>
)

export default App
