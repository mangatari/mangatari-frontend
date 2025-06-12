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
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import AnimeCreate from './pages/AnimeCreate';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      <Navbar />
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
  <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
  <Route path="/about" element={<About />} />

  {/* Private Routes */}
  <Route path="/animelist" element={<IsPrivate><AnimeList /></IsPrivate>} />
  <Route path="/animes/edit/:animeId" element={<IsPrivate><AnimeEdit /></IsPrivate>} />
  <Route path="/mangalist" element={<IsPrivate><MangaList /></IsPrivate>} />
  <Route path="/mangas/edit/:mangaId" element={<IsPrivate><MangaEdit /></IsPrivate>} />
  <Route path="/mangas/create" element={<IsPrivate><MangaCreate /></IsPrivate>} />
  <Route path="/animes/create" element={<IsPrivate><AnimeCreate /></IsPrivate>} />
  <Route path="/animes/:animeId" element={<IsPrivate><AnimeDetails /></IsPrivate>} />
  <Route path="/mangas/:mangaId" element={<IsPrivate><MangaDetails /></IsPrivate>} />
</Routes>
     <Footer />
    </>
  )
}

export default App;