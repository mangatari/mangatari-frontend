import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

function AnimeCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [episodes, setEpisodes] = useState<number>(0);
  const [studio, setStudio] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [genre, setGenre] = useState<string>("");
  const [status, setStatus] = useState<string>("Ongoing");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("year", year.toString());
    formData.append("episodes", episodes.toString());
    formData.append("studio", studio);
    formData.append("rating", rating.toString());
    formData.append("genre", genre);
    formData.append("status", status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(`${API_URL}/api/animes`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("showToast", "Anime created successfully!");
      navigate('/animelist');
    } catch (err) {
      console.error(err);
      setError("Failed to create anime. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pixel-page">
      <h3 className="pixel-titel">Create a New Anime</h3>

      <form className="pixel-form" onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min={1900}
          max={new Date().getFullYear()}
        />

        <label>Episodes:</label>
        <input
          type="number"
          value={episodes}
          onChange={(e) => setEpisodes(Number(e.target.value))}
          min={0}
        />

        <label>Studio:</label>
        <input value={studio} onChange={(e) => setStudio(e.target.value)} />

        <label>Rating (0–10):</label>
        <input
          type="number"
          min={0}
          max={10}
          step={1}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
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
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
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

        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
          {isSubmitting ? "Creating..." : "Create Anime"}
        </button>
      </form>
    </div>
  );
}

export default AnimeCreate;