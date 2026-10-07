import { useContext } from 'react'
import { AuthContext } from './authContext'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>')
  }

  return context
}
