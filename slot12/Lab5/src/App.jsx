import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import Footer from './components/Footer.jsx'
import MyCarousel from './components/MyCarousel.jsx'

function App() {
  return (
    <>
      <Navbar />
      <MyCarousel />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </main>

      <Footer />
    </>
  )
}

export default App
