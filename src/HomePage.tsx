import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

interface Anime {
  id: number;
  title: string;
  image: string;
}

interface Manga {
  id: number;
  title: string;
  image: string;
}

function HomePage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    axios
      .get<Anime[]>(`${API_URL}/api/animes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAnimes(response.data))
      .catch((e) => console.error('Error fetching animes:', e));

    axios
      .get<Manga[]>(`${API_URL}/api/mangas`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMangas(response.data))
      .catch((e) => console.error('Error fetching mangas:', e));
  }, []);

  
  const featuredAnimes = animes.slice(0, 1);
  const featuredMangas = mangas.slice(0, 1);

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        alignItems: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Anime Carousel */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          className="round"
          style={{ marginBottom: '1rem', fontFamily: '"round", monospace' }}
        >
          注目のアニメ
        </h2>
        <Carousel
          withIndicators
          height={280}
          slideSize="33.3333%"
          slideGap="md"
          emblaOptions={{ loop: true, align: 'start' }}
        >
          {featuredAnimes.map((anime) => (
            <Carousel.Slide key={anime.id}>
              <Link
                to={`/animes/${anime.id}`}
                style={{
                  backgroundColor: '#88c070',
                  padding: '0.5rem',
                  display: 'block',
                  border: '4px solid #304030',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#000',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem',
                }}
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    imageRendering: 'pixelated', // pixel art look
                  }}
                />
                <h3 style={{ textAlign: 'center', marginTop: '0.5rem' }}>{anime.title}</h3>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      {/* Center Feature Section */}
      <div
        style={{
          flexBasis: '300px',
          textAlign: 'center',
          fontFamily: '"Press Start 2P", monospace',
          border: '4px solid #304030',
          borderRadius: '12px',
          padding: '1rem',
          backgroundColor: '#cee4a2',
          boxShadow: '0 0 10px #88c070',
          userSelect: 'none',
        }}
      >
        <h1 className='round' style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>漫語</h1>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
           Where anime & manga fans get updated!
          <br />
          Dive in and explore the classics.
        </p>
        {/* You can add pixel-art images or icons here */}
      </div>

      {/* Manga Carousel */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          className="round"
          style={{ marginBottom: '1rem', fontFamily: '"round", monospace' }}
        >
          注目の漫画
        </h2>
        <Carousel
          withIndicators
          height={280}
          slideSize="33.3333%"
          slideGap="md"
          emblaOptions={{ loop: true, align: 'start' }}
        >
          {featuredMangas.map((manga) => (
            <Carousel.Slide key={manga.id}>
              <Link
                to={`/mangas/${manga.id}`}
                style={{
                  backgroundColor: '#88c070',
                  padding: '0.5rem',
                  display: 'block',
                  border: '4px solid #304030',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#000',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '0.75rem',
                }}
              >
                <img
                  src={`${API_URL}${manga.image}`}
                  alt={manga.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    imageRendering: 'pixelated', // pixel art look
                  }}
                />
                <h3 style={{ textAlign: 'center', marginTop: '0.5rem' }}>{manga.title}</h3>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
