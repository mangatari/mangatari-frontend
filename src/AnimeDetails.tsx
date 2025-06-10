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
        {anime.image && (
          <img src={anime.image} alt={anime.title} className="anime-image" />
        )}

        <div className="anime-info">
          <h2 className="square">{anime.title}</h2>

          <p><strong className="square">Genre:</strong> {anime.genre ?? "N/A"}</p>
          <p><strong className="square">Year:</strong> {anime.year ?? "N/A"}</p>
          <p><strong className="square">Studio:</strong> {anime.studio ?? "N/A"}</p>
          <p><strong className="square">Status:</strong> {anime.status ?? "N/A"}</p>
          <p><strong className="square">Episodes:</strong> {anime.episodes ?? "N/A"}</p>
          <p className="anime-description">{anime.description ?? "No description available."}</p>

          <div className="rating-section">
            <p><strong className="square">Your Rating:</strong></p>
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
              &larr; Edit Manga
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .anime-container {
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #222;
        }

        .anime-card {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          background: #f9f9f9;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-wrap: wrap;
        }

        .anime-image {
          width: 280px;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .anime-info {
          flex: 1;
          font-size: 1.15rem;
          line-height: 1.6;
          min-width: 280px;
        }

        .anime-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
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
        }

        .back-link {
          font-size: 1.1rem;
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
        }

        @media (max-width: 700px) {
          .anime-card {
            flex-direction: column;
            padding: 16px;
          }

          .anime-image {
            width: 100%;
            max-height: 400px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .anime-info {
            min-width: auto;
            font-size: 1.1rem;
          }

          .anime-title {
            font-size: 2rem;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default AnimeDetails;
