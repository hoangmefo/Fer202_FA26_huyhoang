import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AxiosDemoPage from './pages/AxiosDemoPage.jsx'
import HttpRequestsPage from './pages/HttpRequestsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PostCreatePage from './pages/PostCreatePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import PostEditPage from './pages/PostEditPage.jsx'
import PostListPage from './pages/PostListPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AxiosDemoPage />} />
        <Route path="http" element={<HttpRequestsPage />} />
        <Route path="posts">
          <Route index element={<PostListPage />} />
          <Route path="new" element={<PostCreatePage />} />
          <Route path=":id" element={<PostDetailPage />} />
          <Route path=":id/edit" element={<PostEditPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
