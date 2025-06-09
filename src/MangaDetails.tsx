import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
  rating?: number;
  image?: string;
  title?: string;
  genre?: string;
  year?: string;
  director?: string;
  iMDB?: string;
  description?: string;
  [key: string]: any;
}

function MangaDetails() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const { mangaId } = useParams();

  const handleRatingChange = (value: number) => {
    setManga((prev) => ({ ...prev, rating: value * 2 } as Manga));

    axios
      .put<Manga>(`${API_URL}/api/manga/${mangaId}`, { rating: value * 2 })
      .then((response) => {
        setManga(response.data);
      })
      .catch((error) => {
        console.error("Failed to update rating", error);
        setManga((prev) => ({ ...prev, rating: prev?.rating } as Manga));
      });
  };

  useEffect(() => {
    axios
      .get<Manga>(`${API_URL}/api/manga/${mangaId}`)
      .then((response) => {
        setManga(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
        setLoading(false);
      });
  }, [mangaId]);

  if (loading) return <div className="pokemon-title">Loading...</div>;
  if (!manga) return <div className="pokemon-title">No manga found...</div>;

  return (
    <div className="pokemon-container">
      <div className="pokemon-card">
        {manga.image && <img src={manga.image} alt={manga.title} />}

        <h2>{manga.title}</h2>
        <p><strong>Genre:</strong> {manga.genre}</p>
        <p><strong>Year:</strong> {manga.year}</p>
        <p><strong>Director:</strong> {manga.director}</p>

        {manga.iMDB && (
          <p>
            <a
              href={manga.iMDB}
              target="_blank"
              rel="noopener noreferrer"
              className="pokemon-button"
            >
              View on IMDb
            </a>
          </p>
        )}

        <p>{manga.description}</p>

        <div>
          <p><strong>Your Rating:</strong></p>
          <Rating
            value={manga.rating ? manga.rating / 2 : 0}
            onChange={handleRatingChange}
            fractions={2}
            color="violet"
            size="lg"
          />
          <p className="text-xs mt-1">{manga.rating}/10</p>
        </div>

        <div className="mt-6">
          <Link to="/mangalist" className="pokemon-button">
            &larr; Back to Manga
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MangaDetails;