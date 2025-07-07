import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";
import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL;

function AnimeCreate() {
  const navigate = useNavigate();

  // Form state
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

const uploadImageToSupabase = async (): Promise<string | null> => {
  if (!imageFile) return null;

  try {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    // Convert File to ArrayBuffer for Supabase upload
    const fileBuffer = await imageFile.arrayBuffer();
    
    const { data, error } = await supabase.storage
      .from('anime-pics')
      .upload(fileName, fileBuffer, {  // Changed from imageFile to fileBuffer
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type
      });

    if (error) throw error;

    // Get public URL - simplified syntax
    return `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/anime-pics/${data.path}`;
    
  } catch (err) {
    console.error("Upload error:", err);
    setError(
      err instanceof Error 
        ? `Image upload failed: ${err.message}`
        : "Image upload failed"
    );
    return null;
  }
};

const handleFormSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    // First upload image if one was selected
    const imageUrl = imageFile ? await uploadImageToSupabase() : null;
    if (imageFile && !imageUrl) return; // Stop if upload failed

    // Then create the anime record
    const response = await axios.post(`${API_URL}/api/animes`, {
      title,
      description,
      year,
      episodes,
      studio,
      rating,
      genre,
      status,
      imageUrl
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    navigate('/animelist', { 
      state: { 
        toast: "Anime created successfully!",
        anime: response.data // Pass the created anime data
      } 
    });
    
  } catch (err) {
    console.error("Creation failed:", err);
    setError(
      axios.isAxiosError(err) 
        ? err.response?.data?.message || "Failed to create anime"
        : "An unexpected error occurred"
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="pixel-page">
      <h3 className="pixel-titel">Create a New Anime</h3>

      <form className="pixel-form" onSubmit={handleFormSubmit}>
        {/* Title */}
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        {/* Description */}
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        {/* Year */}
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min={1900}
          max={new Date().getFullYear()}
        />

        {/* Episodes */}
        <label>Episodes:</label>
        <input
          type="number"
          value={episodes}
          onChange={(e) => setEpisodes(Number(e.target.value))}
          min={0}
        />

        {/* Studio */}
        <label>Studio:</label>
        <input 
          value={studio} 
          onChange={(e) => setStudio(e.target.value)} 
        />

        {/* Rating */}
        <label>Rating (0–10):</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
        />

        {/* Genre */}
        <label>Genre:</label>
        <input 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)} 
          placeholder="Action, Adventure, Comedy"
        />

        {/* Status */}
        <label>Status:</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="pixel-select"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Hiatus">Hiatus</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Image Upload */}
        <label>Cover Image:</label>
        <Dropzone
          onDrop={(files) => setImageFile(files[0])}
          onReject={() => setError("File type not accepted")}
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          maxSize={5 * 1024 ** 2} // 5MB
          className="pixel-dropzone"
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
              <IconUpload size={52} className="text-blue-500" stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={52} className="text-red-500" stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={52} className="text-gray-500" stroke={1.5} />
            </Dropzone.Idle>

            <div className="text-center">
              <Text size="xl" inline>Drag image here or click to select</Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Supports PNG, JPG, WEBP (max 5MB)
              </Text>
            </div>
          </Group>
        </Dropzone>

        {/* Image Preview */}
        {imageFile && (
          <div className="mt-4">
            <Text size="sm">Selected: {imageFile.name}</Text>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 max-h-48 object-contain border rounded"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`pixel-button mt-6 ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
              Creating...
            </span>
          ) : (
            "Create Anime"
          )}
        </button>
      </form>
    </div>
  );
}

export default AnimeCreate;