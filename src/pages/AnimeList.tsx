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
    axios
      .get(`${API_URL}/api/animes`)
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
    }
    setAnimes(sortedAnime);
  };

  const handleAddFavorite = async (animeId: number) => {
    if (!user) return;

    try {
      await axios.post(`${API_URL}/api/favorites/anime`, {
        userId: parseInt(user.id ?? "0", 10),
        animeId,
      });
      toast.success("Anime added to favorites!");
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
      {/* Search + Sort */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          onChange={onChange}
          placeholder="SEARCH..."
          style={{
            width: "300px",
            fontFamily: "'Press Start 2P', monospace",
            padding: "0.75rem 1rem",
            backgroundColor: "#e0f2e9",
            color: "#243b0a",
            border: "3px solid #243b0a",
            boxShadow: "4px 4px 0 #6a7a19",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        />
        <select
          value={sortOption}
          onChange={(e) => {
            const selectedOption = e.target.value;
            setSortOption(selectedOption);
            sortAnime(selectedOption as keyof SortOption);
          }}
          style={{
            width: "180px",
            padding: "0.5rem",
            fontFamily: "'Press Start 2P', monospace",
            backgroundColor: "#e0f2e9",
            color: "#243b0a",
            border: "3px solid #243b0a",
            fontSize: "0.65rem",
            textTransform: "uppercase",
          }}
        >
          <option value="">SORT BY</option>
          <option value="alphabetical">A-Z</option>
          <option value="genre">GENRE</option>
          <option value="year">NEWEST</option>
          <option value="rating">BEST</option>
        </select>
      </div>

      {/* Header & Add Button */}
      <h1 className="pokemon-title">All Animes</h1>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/animes/create" className="pokemon-button">
          Add New Anime
        </Link>
      </div>

      {/* Anime Grid */}
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
                  src={
                    anime.image.startsWith("http")
                      ? anime.image // Use as-is if full URL
                      : `https://ffjzetdwwdmqyluotgff.supabase.co/storage/v1/object${
                          anime.image.startsWith("/") ? "" : "/"
                        }${anime.image}`
                  }
                  alt={anime.title}
                  style={{ width: "200px", marginBottom: "1rem" }}
                  onError={(e) => {
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
                onClick={() => handleAddFavorite(anime.id)}
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

export default AnimeList;
