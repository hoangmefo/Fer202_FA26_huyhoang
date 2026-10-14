import Card from 'react-bootstrap/Card'

const ContactPage = () => (
  <Card className="content-card">
    <Card.Body className="p-4 p-md-5">
      <p className="page-eyebrow">Kết nối</p>
      <h1 className="h2">Liên hệ</h1>
      <p className="text-secondary mb-0">
        Bạn có ý tưởng hoặc muốn trao đổi về một dự án? Mình rất sẵn lòng kết nối.
      </p>
      <p className="mt-3 mb-0">
        Email: <a href="mailto:hoanghuydo07@gmail.com">hoanghuydo07@gmail.com</a>
      </p>
    </Card.Body>
  </Card>
)

export default ContactPage
