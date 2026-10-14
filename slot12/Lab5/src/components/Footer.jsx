import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

function Footer() {
  return (
    <footer className="bg-light border-top py-3 mt-5">
      <Container>
        <Stack gap={1} className="text-center">
          <p className="mb-0">Lab5 - Ứng dụng React Router</p>
          <small className="text-muted">
            © 2026 Lab5. Thông tin liên hệ: hoanghuydo07@gmail.com
          </small>
        </Stack>
      </Container>
    </footer>
  )
}

export default Footer