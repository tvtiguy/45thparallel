import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Media from './pages/Media'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import ManageShows from './pages/ManageShows'
import RateSongs from './pages/RateSongs'
import FanPicks from './pages/FanPicks'
import SurveyResults from './pages/SurveyResults'

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
          {/* Song survey: per-person links, plus a password-gated results page */}
          <Route path="/rate/:token" element={<RateSongs />} />
          <Route path="/picks/:token" element={<FanPicks />} />
          <Route path="/song-results-3n8k" element={<SurveyResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
