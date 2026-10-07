import Container from 'react-bootstrap/Container'
import Header from './Header'
import { useTheme } from '../../context/useTheme'

const Layout = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div
      data-bs-theme={theme}
      className="bg-body text-body min-vh-100 d-flex flex-column"
    >
      <Header />
      <Container className="flex-grow-1 py-4">
        <h1 className="h2 text-center mb-4">Theme sáng/tối và đăng nhập</h1>
        {children}
      </Container>
    </div>
  )
}

export default Layout
