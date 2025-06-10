import React, { useEffect, useState } from "react";
import axios from "axios";

type Manga = {
  id: number;
  title: string;
  description?: string;
  image?: string;
};

function MangaListPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Manga[]>("http://localhost:5005/api/mangas") // Make sure this matches your backend route
      .then((response) => {
        setMangas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load mangas.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Loading mangas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manga List</h1>
      {mangas.length === 0 ? (
        <p>No mangas found.</p>
      ) : (
        <ul>
          {mangas.map((manga) => (
            <li key={manga.id}>
              <h2>{manga.title}</h2>
              {manga.description && <p>{manga.description}</p>}
              {manga.image && (
                <img src={manga.image} alt={manga.title} width="150" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MangaListPage;