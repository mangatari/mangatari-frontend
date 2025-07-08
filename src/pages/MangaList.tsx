import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth.context";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
  id: number;
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

  const { isLoggedIn, user } = useContext(AuthContext);

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

  const sortManga = (option: keyof SortOption) => {
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

  const handleAddFavorite = async (mangaId: number) => {
    if (!user) return;

    try {
      await axios.post(`${API_URL}/api/favorites/manga`, {
        userId: parseInt(user.id ?? "0", 10),
        mangaId,
      });
      toast.success("Manga added to favorites!");
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.info("Already in favorites.");
      } else {
        toast.error("Could not add to favorites.");
      }
    }
  };

  return (
    <div className="pokemon-container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
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
              imageRendering: "pixelated",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "0.8rem",
              color: "#243b0a",
            }}
          >
            🔍
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "inline-block",
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
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
            textTransform: "uppercase",
          }}
        >
          <option value="">SORT BY</option>
          <option value="alphabetical">A-Z</option>
          <option value="genre">GENRE</option>
          <option value="year">NEWEST</option>
          <option value="rating">BEST</option>
        </select>
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            fontSize: "0.8rem",
            color: "#243b0a",
          }}
        >
          ▼
        </div>
      </div>

      <h1 className="pokemon-title">All Mangas</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/mangas/create" className="pokemon-button">
          Add New Manga
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {mangas.map((manga) => (
          <div key={manga.id} className="pokemon-card">
            <Link to={`/mangas/${manga.id}`}>
              {manga.image && (
                <img
                  src={
                    manga.image.startsWith("http")
                      ? manga.image // Use as-is if full URL
                      : `https://ffjzetdwwdmqyluotgff.supabase.co/storage/v1/object/public/manga-pics/${manga.image}`
                  }
                  alt={manga.title}
                  style={{ width: "200px", marginBottom: "1rem" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <h2>{manga.title}</h2>
            </Link>
            {isLoggedIn && (
              <button
                onClick={() => handleAddFavorite(manga.id)}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  backgroundColor: "#e0f2e9",
                  color: "#243b0a",
                  border: "3px solid #243b0a",
                  boxShadow: "4px 4px 0 #6a7a19",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  userSelect: "none",
                  outline: "none",
                  borderRadius: 0,
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#243b0a";
                  e.currentTarget.style.color = "#e0f2e9";
                  e.currentTarget.style.boxShadow = "2px 2px 0 #6a7a19";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0f2e9";
                  e.currentTarget.style.color = "#243b0a";
                  e.currentTarget.style.boxShadow = "4px 4px 0 #6a7a19";
                }}
              >
                ❤️ Favorite
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaList;
