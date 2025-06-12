import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth.context";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Anime {
  id: number;
  title: string;
  description: string;
  year: number;
  episodes: number;
  studio: string;
  rating: number;
  genre: string;
  status: string;
  image: string;
}

function AnimeList() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const toastShown = useRef(false);
  const [originalAnimes, setOriginalAnimes] = useState<Anime[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const { user, isLoggedIn } = useContext(AuthContext);

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

  interface SortOption {
    genre: string;
    year: string;
    alphabetical: string;
    rating: string;
  }

  const sortAnime = (option: keyof SortOption) => {
    let sortedAnime: Anime[] = [...animes];

    if (option === "genre") {
      sortedAnime.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (option === "year") {
      sortedAnime.sort((a, b) => b.year - a.year);
    } else if (option === "alphabetical") {
      sortedAnime.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "rating") {
      sortedAnime.sort((a, b) => b.rating - a.rating);
    } else {
      sortedAnime = [...originalAnimes];
    }

    setAnimes(sortedAnime);
  };

  const handleAddFavorite = (animeId: number) => {
    if (!user) return;

    axios
      .post(
        `${API_URL}/api/favorites/anime`,
        { userId: parseInt(user.id ?? "0", 10), animeId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      )
      .then(() => toast.success("Added to favorites!"))
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.info("Already in favorites.");
        } else {
          toast.error("Failed to add to favorites.");
        }
      });
  };

  return (
    <div className="pokemon-container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <div style={{ position: "relative", width: "300px", fontFamily: "'Press Start 2P', monospace" }}>
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

      <div style={{ position: "relative", display: "inline-block", fontFamily: "'Press Start 2P', monospace" }}>
        <select
          value={sortOption}
          onChange={(e) => {
            const selectedOption = e.target.value;
            setSortOption(selectedOption);
            sortAnime(selectedOption as keyof SortOption);
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

      <h1 className="pokemon-title">All Animes</h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/animes/create" className="pokemon-button">
          Add New Anime
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {animes.map((anime) => (
          <div key={anime.id} className="pokemon-card">
            <Link to={`/animes/${anime.id}`}>
              {anime.image && (
                <img
                  src={`${API_URL}${anime.image.startsWith("/") ? "" : "/"}${anime.image}`}
                  alt="Anime"
                  style={{ width: "200px", marginBottom: "1rem" }}
                  onError={(e) => {
                    console.error("Error loading image:", e.currentTarget.src);
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <h2>{anime.title}</h2>
              {anime.studio && (
                <p>
                  Studio: <strong>{anime.studio}</strong>
                </p>
              )}
            </Link>
            {isLoggedIn && (
              <button
                className="favorite-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddFavorite(anime.id);
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

export default AnimeList;
