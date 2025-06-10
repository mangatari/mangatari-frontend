import axios from "axios";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "./components/SearchBar";
import "./App.css"; 

const API_URL = import.meta.env.VITE_API_URL;

interface Anime {
  id: number;
  title:      string;
  description: string;
  year:        number;
  episodes:    number;
  studio:      string;
  rating:      number;
  genre:       string;
  status:      string;
  image:       string;
};

function AnimeList() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const toastShown = useRef(false);
  const [originalAnimes, setOriginalAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/animes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAnimes(response.data as Anime[]);
        setOriginalAnimes(response.data as Anime[]);
      })
      .catch((e) => console.log("Error getting animes from the API...", e));
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("showToast");
    if (message && !toastShown.current) {
      toast.success(message);
      localStorage.removeItem("showToast");
      toastShown.current = true;
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setAnimes(originalAnimes);
    } else {
      setAnimes(
        originalAnimes.filter(
          (anime) =>
            anime.title.toLowerCase().includes(value) ||
            anime.description.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="pokemon-container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <div style={{ width: "300px" }}>HELLO!
          <SearchBar onChange={onChange} />
        </div>
      </div>

      <h1 className="pokemon-title">All Animes</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/animes/create" className="pokemon-button">Add New Anime</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {animes.map((anime) => (
          <Link
            key={anime.id}
            to={`/animes/${anime.id}`}
            className="pokemon-card"
  >
    {anime.image && (
      <img src={`${anime.image}`} alt="Anime" style={{ width: "200px", marginBottom: "1rem" }} />
    )}
    <h2>{anime.title}</h2>
    {anime.studio && (
      <p>Studio: <strong>{anime.studio}</strong></p>
    )}
  </Link>
))}
      </div>
    </div>
  );
}

export default AnimeList;