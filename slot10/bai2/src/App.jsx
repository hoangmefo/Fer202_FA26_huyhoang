import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import HelpLayout from './components/layout/HelpLayout.jsx'
import BooksPage from './pages/BooksPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RulesPage from './pages/RulesPage.jsx'

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="books" element={<BooksPage />} />
      <Route path="help" element={<HelpLayout />}>
        <Route index element={<Navigate to="faq" replace />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="rules" element={<RulesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
