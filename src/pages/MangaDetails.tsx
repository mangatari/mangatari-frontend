import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
  id: number;
  title: string;
  description?: string | null;
  year?: number | null;
  chapters?: number | null;
  volumes?: number | null;
  author?: string | null;
  genre?: string | null;
  status?: string | null;
  rating?: number | null;
  image?: string | null;
}

function MangaDetails() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const { mangaId } = useParams();

  const handleRatingChange = (value: number) => {
    setManga((prev) => ({ ...prev, rating: value * 2 } as Manga));

    axios
      .put<Manga>(`${API_URL}/api/mangas/${mangaId}`, { rating: value * 2 })
      .then((response) => {
        setManga(response.data);
      })
      .catch((error) => {
        console.error("Failed to update rating", error);
        setManga((prev) => ({ ...prev, rating: prev?.rating } as Manga));
      });
  };

  useEffect(() => {
    if (!mangaId) {
      console.warn("mangaId is undefined");
      return;
    }

    axios
      .get<Manga>(`${API_URL}/api/mangas/${mangaId}`)
      .then((response) => {
        setManga(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
        setLoading(false);
      });
  }, [mangaId]);

  if (loading) return <div className="loading-text">Loading...</div>;
  if (!manga) return <div className="loading-text">No manga found...</div>;

  return (
    <div className="anime-container">
      <div className="anime-card">
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

        <div className="anime-info">
          <h2 className="square">{manga.title}</h2>

          <p>
            <strong className="square">Genre:</strong> {manga.genre ?? "N/A"}
          </p>
          <p>
            <strong className="square">Year:</strong> {manga.year ?? "N/A"}
          </p>
          <p>
            <strong className="square">Author:</strong> {manga.author ?? "N/A"}
          </p>
          <p>
            <strong className="square">Status:</strong> {manga.status ?? "N/A"}
          </p>
          <p>
            <strong className="square">Volumes:</strong> {manga.volumes ?? "N/A"}
          </p>
          <p>
            <strong className="square">Chapters:</strong> {manga.chapters ?? "N/A"}
          </p>
          <p className="anime-description">{manga.description ?? "No description available."}</p>

          <div className="rating-section">
            <p>
              <strong className="square">Your Rating:</strong>
            </p>
            <Rating
              value={manga.rating ? manga.rating / 2 : 0}
              onChange={handleRatingChange}
              fractions={2}
              color="violet"
              size="lg"
            />
            <p className="rating-value">{manga.rating ?? 0}/10</p>
          </div>

          <div className="back-link-container">
            <Link to="/mangalist" className="back-link">
              &larr; Back to Manga
            </Link>
            <Link to={`/mangas/edit/${mangaId}`} className="back-link">
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
          font-family: "Press Start 2P", monospace;
          color: #222;
        }

        .anime-card {
          display: flex;
          gap: 24px;
          align-items: center; /* Center vertically */
          background: #f9f9f9;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-wrap: wrap;
          justify-content: center; /* Center horizontally if wrapped */
        }

        img {
          flex-shrink: 0;
        }

        .anime-info {
          flex: 1;
          font-size: 1.15rem;
          line-height: 1.6;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          justify-content: center; /* Vertically center text content */
        }

        h2.square {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
          text-align: center;
        }

        .anime-info p {
          margin: 8px 0;
          text-align: center;
        }

        .anime-description {
          margin-top: 16px;
          font-style: italic;
          color: #555;
          text-align: center;
        }

        .rating-section {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center the stars */
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
          gap: 1.5rem;
          flex-wrap: wrap;
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
            align-items: center;
          }

          img {
            width: 100%;
            max-height: 400px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .anime-info {
            min-width: auto;
            font-size: 1.1rem;
          }

          h2.square {
            font-size: 1.5rem;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default MangaDetails;
