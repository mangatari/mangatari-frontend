<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AnimeListPage from "./pages/AnimeListPage";
import "./App.css";
import MangaListPage from './pages/MangaListPage';
import AboutPage from './pages/About';
import HomePage from './pages/HomePage';
=======
import { useState } from 'react'
import './App.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AnimeDetails from './AnimeDetails'
import MangaDetails from './MangaDetails'
import AnimeList from './AnimeList';
import AnimeEdit from './AnimeEdit';
import MangaEdit from './MangaEdit';
import MangaList from './MangaList';
import About from './About';
>>>>>>> 0fc0c85 (feat: Add Mantine UI components and styles, implement routing for new pages)

function App() {
  return (
<<<<<<< HEAD
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
=======
    <>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/animes/:animeId" element={<AnimeDetails />} />
          <Route path="/animelist" element={<AnimeList />} />
          <Route path="/animes/edit/:animeId" element={<AnimeEdit />} />
          <Route path="/mangas/:mangaId" element={<MangaDetails />} />
          <Route path="/mangas/edit/:mangaId" element={<MangaEdit />} />
          <Route path="/mangalist" element={<MangaList />} />
          <Route path="/about" element={<About />} />
      </Routes>
     <Footer />
    </>
  )
>>>>>>> 0fc0c85 (feat: Add Mantine UI components and styles, implement routing for new pages)
}

export default App;