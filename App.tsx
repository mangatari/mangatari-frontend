import { useState } from 'react'
import './App.css'
import Navbar from './src/components/NavBar'
import Footer from './src/components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Route, Routes } from 'react-router';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignupPage';
import AnimeDetails from './src/pages/AnimeDetails'
import MangaDetails from './src/pages/MangaDetails'
import AnimeList from './src/pages/AnimeList';
import AnimeEdit from './src/pages/AnimeEdit';
import MangaEdit from './src/pages/MangaEdit';
import MangaList from './src/pages/MangaList';
import About from './src/pages/About';
import MangaCreate from './src/pages/MangaCreate';

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
          <Route path="/mangas/create/" element={<MangaCreate />} />
          <Route path="/mangalist" element={<MangaList />} />
          <Route path="/about" element={<About />} />
      </Routes>
     <Footer />
    </>
  )
}

export default App;