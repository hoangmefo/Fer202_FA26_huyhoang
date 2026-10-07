import { useContext } from 'react'
import { ThemeContext } from './themeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme phải được dùng bên trong <ThemeProvider>')
  }

  return context
}
