import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AnimeListPage from "./pages/AnimeListPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/animes" element={<AnimeListPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;