import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import Footer from './components/Footer.jsx'
import MyCarousel from './components/MyCarousel.jsx'
import Container from 'react-bootstrap/Container'
import ProductList from './pages/ProductList.jsx'

function App() {
  return (
    <>
      <Navbar />
      <MyCarousel />
      <Container as="main" className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>

      </Container>

      <Footer />
    </>
  )
}

export default App
