import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

interface Anime {
  id: number;
  title: string;
  description?: string | null;
  year?: number | null;
  episodes?: number | null;
  studio?: string | null;
  rating?: number | null;
  genre?: string | null;
  status?: string | null;
  image?: string | null;
}

function AnimeDetails() {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const { animeId } = useParams();

  const handleRatingChange = (value: number) => {
    setAnime((prev) => ({ ...prev, rating: value * 2 } as Anime));

    axios
      .put<Anime>(`${API_URL}/api/animes/${animeId}`, { rating: value * 2 })
      .then((response) => {
        setAnime(response.data);
      })
      .catch((error) => {
        console.error("Failed to update rating", error);
        setAnime((prev) => ({ ...prev, rating: prev?.rating } as Anime));
      });
  };

  useEffect(() => {
    if (!animeId) {
      console.warn("animeId is undefined");
      return;
    }

    axios
      .get<Anime>(`${API_URL}/api/animes/${animeId}`)
      .then((response) => {
        setAnime(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
        setLoading(false);
      });
  }, [animeId]);

  if (loading) return <div className="loading-text">Loading...</div>;
  if (!anime) return <div className="loading-text">No anime found...</div>;

  return (
    <div className="anime-container">
      <div className="anime-card">
      <div>
        {anime.image && (
          <img
            src={`${API_URL}${anime.image.startsWith('/') ? '' : '/'}${anime.image}`}
            alt="Anime"
            style={{ width: "200px", marginBottom: "1rem" }}
            onError={(e) => {
              console.error("Error loading image:", {
                src: e.currentTarget.src,
                apiUrl: API_URL,
                imagePath: anime.image,
                fullUrl: `${API_URL}${anime.image}`
              });
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div className="anime-info">
          <h2 className="anime-title">{anime.title}</h2>

          <p><strong>Genre:</strong> {anime.genre ?? "N/A"}</p>
          <p><strong>Year:</strong> {anime.year ?? "N/A"}</p>
          <p><strong>Studio:</strong> {anime.studio ?? "N/A"}</p>
          <p><strong>Status:</strong> {anime.status ?? "N/A"}</p>
          <p><strong>Episodes:</strong> {anime.episodes ?? "N/A"}</p>
          <p className="anime-description">{anime.description ?? "No description available."}</p>

          <div className="rating-section">
            <p><strong>Your Rating:</strong></p>
            <Rating
              value={anime.rating ? anime.rating / 2 : 0}
              onChange={handleRatingChange}
              fractions={2}
              color="violet"
              size="lg"
            />
            <p className="rating-value">{anime.rating ?? 0}/10</p>
          </div>

          <div className="back-link-container">
            <Link to="/animelist" className="back-link">
              &larr; Back to Anime
            </Link>
            <Link to={`/animes/edit/${animeId}`} className="back-link">
              &larr; Edit Anime
            </Link>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        .anime-container {
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
          font-family: "Press Start 2P", monospace;
          color: #222;
          text-align: center;
        }

        .anime-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          background: #f9f9f9;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .anime-image {
          width: 500px;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .anime-info {
          max-width: 600px;
          font-size: 1rem;
          line-height: 1.6;
        }

        .anime-title {
          font-size: 1.5rem;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .anime-info p {
          margin: 8px 0;
        }

        .anime-description {
          margin-top: 16px;
          font-style: italic;
          color: #555;
        }

        .rating-section {
          margin-top: 24px;
        }

        .rating-value {
          margin-top: 4px;
          font-size: 1rem;
          color: #6b21a8; /* violet */
          font-weight: 600;
        }

        .back-link-container {
          margin-top: 32px;
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .back-link {
          font-size: 1rem;
          text-decoration: none;
          color: #6b21a8;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #4c1586;
        }

        .loading-text {
          font-size: 1.5rem;
          text-align: center;
          margin-top: 60px;
          color: #666;
          font-family: "Press Start 2P", monospace;
        }

        @media (max-width: 700px) {
          .anime-image {
            width: 100%;
            max-width: 400px;
          }

          .anime-info {
            font-size: 0.9rem;
          }

          .anime-title {
            font-size: 1.2rem;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default AnimeDetails;
