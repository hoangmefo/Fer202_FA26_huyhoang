import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useAuth } from './context/useAuth'
import Layout from './components/layout/Layout'
import LoginForm from './components/LoginForm'

const HomeContent = () => {
  const { isLoggedIn, user, login } = useAuth()

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={login} />
  }

  return (
    <div className="text-center py-5">
      <h2 className="mb-3">Đăng nhập thành công</h2>
      <p className="text-body-secondary">
        Bạn đang đăng nhập bằng <strong>{user.email}</strong>. Hãy thử đổi theme
        bằng nút trên thanh điều hướng.
      </p>
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <Layout>
        <HomeContent />
      </Layout>
    </AuthProvider>
  </ThemeProvider>
)

export default App
