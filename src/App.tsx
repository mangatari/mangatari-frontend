import './App.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AnimeDetails from './pages/AnimeDetails'
import MangaDetails from './pages/MangaDetails'
import AnimeList from './pages/AnimeList';
import AnimeEdit from './pages/AnimeEdit';
import MangaEdit from './pages/MangaEdit';
import MangaList from './pages/MangaList';
import About from './pages/About';
import MangaCreate from './pages/MangaCreate';
import AnimeCreate from './pages/AnimeCreate';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/animes/:animeId" element={<AnimeDetails />} />
          <Route path="/animes/create" element={<AnimeCreate />} />
          <Route path="/animelist" element={<AnimeList />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/animes/edit/:animeId" element={<AnimeEdit />} />
          <Route path="/mangas/:mangaId" element={<MangaDetails />} />
          <Route path="/mangas/edit/:mangaId" element={<MangaEdit />} />
          <Route path="/mangas/create/" element={<MangaCreate />} />
          <Route path="/mangalist" element={<MangaList />} />
          <Route path="/about" element={<About />} />
      </Routes>
     <Footer />
    </>
  )
}

export default App;