import { Link, NavLink, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const MainLayout = () => (
  <>
    <Navbar bg="white" expand="lg" className="site-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          FPT University Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="library-navbar" />
        <Navbar.Collapse id="library-navbar" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
            <Nav.Link as={NavLink} to="/books">Sách</Nav.Link>
            <Nav.Link as={NavLink} to="/help">Hướng dẫn</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container as="main" className="page-shell py-5">
      <Outlet />
    </Container>
    <footer className="site-footer border-top bg-white py-4">
      <Container className="small">
        © 2026 Thư viện FPT University. Không gian học tập và kết nối tri thức.
      </Container>
    </footer>
  </>
)

export default MainLayout
