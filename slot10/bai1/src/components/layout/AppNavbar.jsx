import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const MENU = [
  { to: '/', label: 'Trang chủ' },
  { to: '/skills', label: 'Kỹ năng' },
  { to: '/projects', label: 'Dự án' },
  { to: '/contact', label: 'Liên hệ' },
]

const AppNavbar = () => (
  <Navbar bg="white" expand="lg" className="site-navbar" sticky="top">
    <Container>
      <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
        Huy Hoàng
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="portfolio-navbar" />
      <Navbar.Collapse id="portfolio-navbar" className="justify-content-end">
        <Nav>
          {MENU.map((item) => (
            <Nav.Link
              as={NavLink}
              to={item.to}
              end={item.to === '/'}
              key={item.to}
            >
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default AppNavbar
