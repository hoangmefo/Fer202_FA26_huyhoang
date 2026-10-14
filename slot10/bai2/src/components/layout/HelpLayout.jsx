import { NavLink, Outlet } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

const HelpLayout = () => (
  <Card className="content-card">
    <Card.Body className="p-4 p-md-5">
      <p className="page-eyebrow">Hỗ trợ bạn đọc</p>
      <h1 className="h2 mb-4">Hướng dẫn sử dụng thư viện</h1>
      <Nav variant="tabs" className="mb-4">
        <Nav.Link as={NavLink} to="/help/faq">Câu hỏi thường gặp</Nav.Link>
        <Nav.Link as={NavLink} to="/help/rules">Nội quy</Nav.Link>
      </Nav>
      <Outlet />
    </Card.Body>
  </Card>
)

export default HelpLayout
