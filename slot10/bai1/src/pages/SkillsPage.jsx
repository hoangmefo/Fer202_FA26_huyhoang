import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const skills = ['HTML & CSS', 'JavaScript hiện đại', 'React và component', 'Git & GitHub']

const SkillsPage = () => (
  <Card className="content-card">
    <Card.Body className="p-4 p-md-5">
      <p className="page-eyebrow">Năng lực</p>
      <h1 className="h2 mb-4">Kỹ năng</h1>
      <ListGroup variant="flush">
        {skills.map((skill) => (
          <ListGroup.Item key={skill} className="px-0 py-3">
            <span className="me-2 text-primary" aria-hidden="true">●</span>
            {skill}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
)

export default SkillsPage
