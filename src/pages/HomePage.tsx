import { useEffect, useState, useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Link } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface MediaItem {
  id: number;
  title: string;
  image: string | null;
}

function HomePage() {
  const [animes, setAnimes] = useState<MediaItem[]>([]);
  const [mangas, setMangas] = useState<MediaItem[]>([]);

  const animeAutoplay = useRef(Autoplay({ delay: 3000 }));
  const mangaAutoplay = useRef(Autoplay({ delay: 3000 }));

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/animes`);
        if (!response.ok) throw new Error("Failed to fetch animes");
        const data = await response.json();
        setAnimes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnimes();

    axios
      .get<MediaItem[]>(`${VITE_API_URL}/api/mangas`)
      .then((res) => setMangas(res.data))
      .catch((err) => console.error("Error fetching mangas:", err));
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Anime Carousel */}
      <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
        <h2 className="hover-translate" style={{ marginBottom: "1rem" }}>
          <span className="en">Featured Anime</span>
          <span className="jp">注目のアニメ</span>
        </h2>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Carousel
            slideSize="100%"
            height={280}
            slideGap={0}
            // @ts-ignore
            align="start"
            withIndicators
            plugins={[animeAutoplay.current]}
            onMouseEnter={animeAutoplay.current.stop}
            onMouseLeave={() => animeAutoplay.current.play()}
          >
            {animes.map((anime) => (
              <Carousel.Slide key={anime.id}>
                <Link
                  to={`/animes/${anime.id}`}
                  style={{
                    backgroundColor: "#88c070",
                    padding: "0.5rem",
                    display: "block",
                    border: "4px solid #304030",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000",
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: "0.75rem",
                  }}
                >
                  {anime.image && (
                    <img
                      src={anime.image}
                      alt={anime.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        imageRendering: "pixelated",
                      }}
                      onError={(e) => {
                        console.error("Anime image error", {
                          src: e.currentTarget.src,
                          imagePath: anime.image
                        });
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <h3 style={{ textAlign: "center", marginTop: "0.5rem" }}>
                    {anime.title}
                  </h3>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Center Feature */}
      <div
        style={{
          flexBasis: "300px",
          textAlign: "center",
          fontFamily: '"Press Start 2P", monospace',
          border: "4px solid #304030",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#cee4a2",
          boxShadow: "0 0 10px #88c070",
          userSelect: "none",
        }}
      >
        <h1 className="round" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          漫語
        </h1>
        <p style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
          Where anime & manga fans get updated!
          <br />
          Dive in and explore the classics.
        </p>
      </div>

      {/* Manga Carousel */}
      <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
        <h2 className="hover-translate" style={{ marginBottom: "1rem" }}>
          <span className="en">Featured Manga</span>
          <span className="jp">注目の漫画</span>
        </h2>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Carousel
            slideSize="100%"
            height={280}
            slideGap={0}
            // @ts-ignore
            align="start"
            withIndicators
            plugins={[mangaAutoplay.current]}
            onMouseEnter={mangaAutoplay.current.stop}
            onMouseLeave={() => mangaAutoplay.current.play()}
          >
            {mangas.map((manga) => (
              <Carousel.Slide key={manga.id}>
                <Link
                  to={`/mangas/${manga.id}`}
                  style={{
                    backgroundColor: "#88c070",
                    padding: "0.5rem",
                    display: "block",
                    border: "4px solid #304030",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#000",
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: "0.75rem",
                  }}
                >
                  {manga.image && (
                    <img
                      src={manga.image}
                      alt={manga.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        imageRendering: "pixelated",
                      }}
                      onError={(e) => {
                        console.error("Manga image error", {
                          src: e.currentTarget.src,
                          imagePath: manga.image
                        });
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <h3 style={{ textAlign: "center", marginTop: "0.5rem" }}>
                    {manga.title}
                  </h3>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default HomePage;