import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

interface Manga {
  id: number;
  title: string;
  description?: string;
  year?: number;
  volumes?: number;
  chapters?: number;
  author?: string;
  rating?: number;
  genre?: string;
  status?: string;
  image?: string;
}

function MangaEdit() {
  const { mangaId } = useParams<{ mangaId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(2024);
  const [volumes, setVolumes] = useState(0);
  const [chapters, setChapters] = useState(0);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/mangas/${mangaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const manga = response.data as Manga;
        setTitle(manga.title);
        setDescription(manga.description || "");
        setYear(manga.year || 2024);
        setVolumes(manga.volumes || 0);
        setChapters(manga.chapters || 0);
        setAuthor(manga.author || "");
        setRating(manga.rating || 0);
        setGenre(manga.genre || "");
        setStatus(manga.status || "Ongoing");
        setImage(manga.image || "");
      })
      .catch((error) => console.error(error));
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
      navigate("/mangalist");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteManga = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/api/mangas/${mangaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("showToast", "Manga deleted successfully!");
      navigate("/mangalist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pixel-page">
      <h3 className="pixel-titel">Edit the Manga</h3>

      <form className="pixel-form" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="year">Year:</label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <label htmlFor="volumes">Volumes:</label>
        <input
          id="volumes"
          type="number"
          value={volumes}
          onChange={(e) => setVolumes(Number(e.target.value))}
        />

        <label htmlFor="chapters">Chapters:</label>
        <input
          id="chapters"
          type="number"
          value={chapters}
          onChange={(e) => setChapters(Number(e.target.value))}
        />

        <label htmlFor="author">Author:</label>
        <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label htmlFor="rating">Rating (1–10):</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="10"
          step="1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <label htmlFor="genre">Genre:</label>
        <input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />

        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
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

        {image && !imageFile && (
          <div style={{ marginTop: "1rem" }}>
            <Text size="sm">Current image:</Text>
            <img
              src={`${API_URL}${image}`}
              alt="Current manga"
              style={{ maxWidth: "200px", marginTop: "0.5rem" }}
            />
          </div>
        )}

        {imageFile && (
          <Text size="sm" mt="sm">
            Selected image: {imageFile.name}
          </Text>
        )}

        <button type="submit" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
          {isSubmitting ? "Updating..." : "Update Manga"}
        </button>

        <button type="button" onClick={deleteManga} style={{ marginTop: "1rem" }}>
          Delete Manga
        </button>
      </form>
    </div>
  );
}

export default MangaEdit;
