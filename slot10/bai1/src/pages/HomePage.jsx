import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const HomePage = () => (
  <section className="hero-panel p-4 p-md-5">
    <h1 className="display-5 fw-bold">Xin chào, mình là Huy Hoàng.</h1>
    <p className="lead col-lg-8 mt-3 mb-4 text-white-50">
      Mình là sinh viên FER202 yêu thích xây dựng giao diện web gọn gàng, dễ dùng
      và có trải nghiệm mượt mà.
    </p>
    <Button as={Link} to="/projects" variant="light" className="fw-semibold">
      Xem dự án của mình
    </Button>
  </section>
)

export default HomePage
