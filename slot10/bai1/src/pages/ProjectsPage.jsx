import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const projects = [
  {
    title: 'Portfolio cá nhân',
    description: 'Giới thiệu kỹ năng, dự án và thông tin liên hệ trong một website.',
    category: 'React',
  },
  {
    title: 'Ứng dụng quản lý công việc',
    description: 'Theo dõi trạng thái công việc với giao diện đơn giản, trực quan.',
    category: 'JavaScript',
  },
  {
    title: 'Trang giới thiệu sản phẩm',
    description: 'Trình bày nội dung sản phẩm theo bố cục thân thiện trên di động.',
    category: 'UI Design',
  },
]

const ProjectsPage = () => (
  <>
    <p className="page-eyebrow">Sản phẩm đã thực hiện</p>
    <h1 className="h2 mb-4">Dự án</h1>
    <Row className="g-4">
      {projects.map((project) => (
        <Col md={6} lg={4} key={project.title}>
          <Card className="content-card h-100">
            <Card.Body className="p-4">
              <span className="badge text-bg-primary mb-3">{project.category}</span>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text className="text-secondary">{project.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
)

export default ProjectsPage
