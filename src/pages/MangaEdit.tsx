import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";
import "../App.css"

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
  id: number;
  title: string;
  description: string;
  year: number;
  volumes: number;
  chapters: number;
  author: string;
  rating: number;
  genre: string;
  status: string;
  image: string;
}

function MangaEditPage() {
  const { mangaId } = useParams<{ mangaId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [year, setYear] = useState<number>(2024);
  const [volumes, setVolumes] = useState<number>(0);
  const [chapters, setChapters] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [genre, setGenre] = useState<string>("");
  const [status, setStatus] = useState<string>("Ongoing");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/mangas/${mangaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const manga: Manga = response.data as Manga;
        setTitle(manga.title);
        setDescription(manga.description);
        setYear(manga.year);
        setVolumes(manga.volumes);
        setChapters(manga.chapters);
        setAuthor(manga.author);
        setRating(manga.rating);
        setGenre(manga.genre);
        setStatus(manga.status);
        setImage(manga.image);
      })
      .catch((error) => console.log(error));
  }, [mangaId]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("year", year.toString());
    formData.append("volumes", volumes.toString());
    formData.append("chapters", chapters.toString());
    formData.append("author", author);
    formData.append("rating", rating.toString());
    formData.append("genre", genre);
    formData.append("status", status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`${API_URL}/api/mangas/${mangaId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("showToast", "Manga updated successfully!");
      navigate(`/mangalist`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteManga = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/mangas/${mangaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.setItem("showToast", "Manga deleted successfully!");
        navigate("/mangalist");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="pixel-page">
      <h3 className="pixel-titel">Edit the Manga</h3>

      <form className="pixel-form" onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <label>Volumes:</label>
        <input
          type="number"
          value={volumes}
          onChange={(e) => setVolumes(Number(e.target.value))}
        />

        <label>Chapters:</label>
        <input
          type="number"
          value={chapters}
          onChange={(e) => setChapters(Number(e.target.value))}
        />

        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label>Rating (1–10):</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
        />

        <label>Genre:</label>
        <input value={genre} onChange={(e) => setGenre(e.target.value)} />

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Hiatus">Hiatus</option>
          <option value="Dropped">Dropped</option>
        </select>

        <label>Image:</label>
        <Dropzone
          onDrop={(files) => setImageFile(files[0])}
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          maxSize={5 * 1024 ** 2}
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
              <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag image here or click to select
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Only one image, max 5 MB
              </Text>
            </div>
          </Group>
        </Dropzone>

        {imageFile && (
          <Text size="sm" mt="sm">
            Selected image: {imageFile.name}
          </Text>
        )}

        <button type="submit" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
          {isSubmitting ? "Updating..." : "Update Manga"}
        </button>
        <button onClick={deleteManga} style={{ marginTop: "1rem" }}>
        Delete Manga
      </button>
      </form>

     
    </div>
  );
}

export default MangaEditPage;