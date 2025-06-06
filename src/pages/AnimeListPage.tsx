import React, { useEffect, useState } from "react";
import axios from "axios";

type Anime = {
  id: number;
  title: string;
  description?: string;
  image?: string;
};

function AnimeListPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/animes") // Adjust the URL if needed
      .then((response) => {
        setAnimes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load animes.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Loading animes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Anime List</h1>
      {animes.length === 0 ? (
        <p>No animes found.</p>
      ) : (
        <ul>
          {animes.map((anime) => (
            <li key={anime.id}>
              <h2>{anime.title}</h2>
              {anime.description && <p>{anime.description}</p>}
              {anime.image && (
                <img src={anime.image} alt={anime.title} width="150" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnimeListPage;