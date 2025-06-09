import axios from "axios";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "./components/SearchBar";
import "./App.css"; 

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
    rating: number;
    image: string;
    title: string;
    genre: string;
    year: number;
    chapters: number;
    author: string;
    description: string;
    volumes?: number;
    status?: string;
    [key: string]: any;

}

function MangaList() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const toastShown = useRef(false);
  const [originalMangas, setOriginalMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/mangas`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMangas(response.data as Manga[]);
        setOriginalMangas(response.data as Manga[]);
      })
      .catch((e) => console.log("Error getting mangas from the API...", e));
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
      setMangas(originalMangas);
    } else {
      setMangas(
        originalMangas.filter(
          (manga) =>
            manga.title.toLowerCase().includes(value) ||
            manga.description.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="pokemon-container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <div style={{ width: "300px" }}>
          <SearchBar onChange={onChange} />
        </div>
      </div>

      <h1 className="pokemon-title">All Mangas</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/mangas/create" className="pokemon-button">Create New Manga</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {mangas.map((manga) => (
          <Link
            key={manga.id}
            to={`/mangas/${manga.id}`}
            className="pokemon-card"
          >
            {manga.image && (
              <img
                src={`${API_URL}${manga.image}`}
                alt={manga.title}
              />
            )}
            <h2>{manga.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default MangaList;