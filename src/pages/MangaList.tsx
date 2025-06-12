import axios from "axios";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"; 

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
  const [sortOption, setSortOption] = useState<string>("");

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

  interface SortOption {
    genre: string;
    year: string;
    alphabetical: string;
    rating: string;
  }

  const sortManga= (option: keyof SortOption) => {
    let sortedManga: Manga[] = [...mangas];
  
    if (option === "genre") {
      sortedManga.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (option === "year") {
      sortedManga.sort((a, b) => b.year - a.year);
    } else if (option === "alphabetical") {
      sortedManga.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "rating") {
      sortedManga.sort((a, b) => b.rating - a.rating);
    } else {
      sortedManga = [...originalMangas];
    }
  
    setMangas(sortedManga);
  };

  return (
    <div className="pokemon-container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
      <div style={{ 
  position: "relative",
  width: "300px",
  fontFamily: "'Press Start 2P', monospace"
}}>
  <input
    type="text"
    onChange={onChange}
    placeholder="SEARCH..."
    style={{
      width: "100%",
      padding: "0.75rem 1rem",
      paddingRight: "2.5rem",
      fontFamily: "inherit",
      fontSize: "0.65rem",
      backgroundColor: "#e0f2e9",
      color: "#243b0a",
      border: "3px solid #243b0a",
      borderRadius: "0",
      boxShadow: "4px 4px 0 #6a7a19",
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: "1px",
      imageRendering: "pixelated"
    }}
  />
  
  {/* Pixel search icon */}
  <div style={{
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "0.8rem",
    color: "#243b0a"
  }}>
    🔍
  </div>
</div>
      </div>
      <div style={{ 
  position: "relative",
  display: "inline-block",
  fontFamily: "'Press Start 2P', monospace"
}}>
  <select
    value={sortOption}
    onChange={(e) => {
      const selectedOption = e.target.value;
      setSortOption(selectedOption);
      sortManga(selectedOption as keyof SortOption);
    }}
    style={{
      width: "180px",
      padding: "0.5rem 0.75rem",
      paddingRight: "2rem",
      fontFamily: "inherit",
      fontSize: "0.65rem",
      backgroundColor: "#e0f2e9",
      color: "#243b0a",
      border: "3px solid #243b0a",
      borderRadius: "0",
      boxShadow: "3px 3px 0 #6a7a19",
      cursor: "pointer",
      appearance: "none",
      outline: "none",
      textTransform: "uppercase"
    }}
  >
    <option value="">SORT BY</option>
    <option value="alphabetical">A-Z</option>
    <option value="genre">GENRE</option>
    <option value="year">NEWEST</option>
    <option value="rating">BEST</option>
  </select>
  
  {/* Custom pixel arrow */}
  <div style={{
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "0.8rem",
    color: "#243b0a"
  }}>
    ▼
  </div>
</div>

      <h1 className="pokemon-title">All Mangas</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/mangas/create" className="pokemon-button">Add New Manga</Link>
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
                src={`${API_URL}${manga.image.startsWith('/') ? '' : '/'}${manga.image}`}
                alt="Manga"
                style={{ width: "200px", marginBottom: "1rem" }}
                onError={(e) => {
                  console.error("Error loading image:", {
                    src: e.currentTarget.src,
                    apiUrl: API_URL,
                    imagePath: manga.image,
                    fullUrl: `${API_URL}${manga.image}`
                  });
                  e.currentTarget.style.display = 'none';
                }}
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