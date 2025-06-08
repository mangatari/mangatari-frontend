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
}

export default App;