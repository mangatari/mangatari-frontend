import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

function MangaDetails() {
  const [manga, setManga] = useState<{ rating?: number; [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const { mangaId } = useParams();

  // Handle rating change with backend update
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

const handleRatingChange = (value: number) => {
    // Optimistic UI update:
    setManga((prev) => ({ ...prev, rating: value * 2 } as Manga));

    // Persist rating to backend
    axios
        .put<Manga>(`${API_URL}/api/manga/${mangaId}`, { rating: value * 2 })
        .then((response) => {
            setManga(response.data); // update with confirmed data from backend
        })
        .catch((error) => {
            console.error("Failed to update rating", error);
            // Optionally, revert optimistic update on error
            setManga((prev) => ({ ...prev, rating: prev?.rating } as Manga));
        });
};

  useEffect(() => {
    const getManga = () => {
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
    };
    getManga();
  }, [mangaId]);

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!manga)
    return <div className="text-center mt-10 error-text">No film found...</div>;

  return (
    <div className="page-container">
      <div className="profile-card w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {manga.image && (
          <img
            src={manga.image}
            alt={manga.title}
            className="w-full md:w-[500px] h-auto rounded-md object-contain border border-[var(--border-color)]"
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl mb-4">{manga.title}</h1>
          <div className="text-sm text-[var(--secondary-text)] mb-4">
            <span className="mr-4">
              <strong>Genre:</strong> {manga.genre}
            </span>
            <span className="mr-4">
              <strong>Year:</strong> {manga.year}
            </span>
            <span>
              <strong>Director:</strong> {manga.director}
            </span>
          </div>
          {manga.iMDB && (
            <p className="mb-4 text-sm">
              <a
                href={manga.iMDB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-color)] hover:text-[var(--highlight)] underline"
              >
                View on IMDb
              </a>
            </p>
          )}
          <p className="text-[var(--text-color)] leading-relaxed">
            {manga.description}
          </p>
          {/* RATING SECTION */}
          <div className="mb-4">
            <p className="mb-1 text-sm">
              <strong>Your Rating:</strong>
            </p>
            <Rating
              value={manga.rating ? manga.rating / 2 : 0} // Convert 10 scale to 5 stars
              onChange={handleRatingChange}
              fractions={2}
              color="violet"
              size="lg"
            />
            <p className="text-xs mt-1 text-[var(--secondary-text)]">
              {manga.rating}/10
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/mangalist"
              className="text-[var(--accent-color)] hover:text-[var(--highlight)] text-sm underline"
            >
              &larr; Back to Manga
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaDetails;