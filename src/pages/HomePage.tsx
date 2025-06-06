import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to Mangatari</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
        Discover a curated collection of your favorite anime and manga titles.
        Explore, read, watch, and keep track of what you love — all in one place.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
        <Link
          to="/mangas"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#ff4081",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Browse Manga
        </Link>

        <Link
          to="/animes"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#448aff",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Browse Anime
        </Link>
      </div>
    </div>
  );
}

export default HomePage;