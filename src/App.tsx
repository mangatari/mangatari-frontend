import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AnimeListPage from "./pages/AnimeListPage";
import "./App.css";
import MangaListPage from './pages/MangaListPage';
import AboutPage from './pages/About';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animes" element={<AnimeListPage />} />
        <Route path="/mangas" element={<MangaListPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;