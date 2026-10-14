import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const HomePage = () => (
  <section className="hero-panel p-4 p-md-5">
    <p className="text-white-50 text-uppercase small fw-semibold mb-2">FPT University</p>
    <h1 className="display-6 fw-bold">Chào mừng đến với thư viện</h1>
    <p className="lead text-white-50 col-lg-8 mt-3 mb-4">
      Khám phá tài nguyên học tập và tìm hiểu cách sử dụng thư viện.
    </p>
    <Button as={Link} to="/books" variant="light">Khám phá sách</Button>
  </section>
)

export default HomePage
