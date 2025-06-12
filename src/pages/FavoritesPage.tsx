import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface Anime {
  id: number;
  title: string;
  image?: string | null;
}

interface Manga {
  id: number;
  title: string;
  image?: string | null;
}

function FavoritesPage() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token || !user?.id) return;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const fetchFavorites = async () => {
      try {
        const [animeRes, mangaRes] = await Promise.all([
          fetch(`${API_URL}/api/favorites/anime/${user.id}`, { headers }),
          fetch(`${API_URL}/api/favorites/manga/${user.id}`, { headers })
        ]);

        if (!animeRes.ok || !mangaRes.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const animeData = await animeRes.json();
        const mangaData = await mangaRes.json();

        setAnimes(animeData);
        setMangas(mangaData);
      } catch (err: any) {
        console.error("Error loading favorites:", err);
        setError(err.message || "Something went wrong");
      }
    };

    fetchFavorites();
  }, [user]);

  if (isLoading) return <div className="loading-text">Loading user...</div>;
  if (error) return <div className="loading-text">Error: {error}</div>;

  return (
    <div className="favorites-container">
      <h2>Favorite Anime</h2>
      <div className="card-grid">
        {animes.length === 0 ? (
          <p>No favorite anime yet.</p>
        ) : (
          animes.map((anime) => (
            <Link to={`/animes/${anime.id}`} className="card-link" key={anime.id}>
              <div className="item-card">
                {anime.image && <img src={`${API_URL}${anime.image}`} alt={anime.title} />}
                <p>{anime.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <h2 style={{ marginTop: "3rem" }}>Favorite Manga</h2>
      <div className="card-grid">
        {mangas.length === 0 ? (
          <p>No favorite manga yet.</p>
        ) : (
          mangas.map((manga) => (
            <Link to={`/mangas/${manga.id}`} className="card-link" key={manga.id}>
              <div className="item-card">
                {manga.image && <img src={`${API_URL}${manga.image}`} alt={manga.title} />}
                <p>{manga.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <style>{`
        .favorites-container {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
          font-family: "Press Start 2P", monospace;
          text-align: center;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .item-card {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }

        .item-card:hover {
          transform: translateY(-5px);
        }

        .item-card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .item-card p {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .card-link {
          text-decoration: none;
          color: inherit;
        }

        .loading-text {
          font-size: 1.2rem;
          margin-top: 2rem;
          font-family: "Press Start 2P", monospace;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default FavoritesPage;
