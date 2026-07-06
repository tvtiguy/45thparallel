import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Media from './pages/Media'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import ManageShows from './pages/ManageShows'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/manage-shows-6b2f" element={<ManageShows />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
