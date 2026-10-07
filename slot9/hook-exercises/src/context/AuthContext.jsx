import { useState } from 'react'
import { AuthContext } from './authContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (email) => {
    setUser({ email, name: email.split('@')[0] })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
