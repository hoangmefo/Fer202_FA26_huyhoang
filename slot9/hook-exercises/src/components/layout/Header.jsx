import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from '../../context/useAuth'
import { useTheme } from '../../context/useTheme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark">
      <Container className="gap-3 flex-wrap">
        <Navbar.Brand>Hook Exercises</Navbar.Brand>
        <div className="d-flex align-items-center gap-2 ms-auto">
          <Button variant="outline-light" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </Button>
          {isLoggedIn ? (
            <>
              <Navbar.Text className="text-white">
                Xin chào, {user.name}
              </Navbar.Text>
              <Button variant="light" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Navbar.Text className="text-white-50">
              Chưa đăng nhập
            </Navbar.Text>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
