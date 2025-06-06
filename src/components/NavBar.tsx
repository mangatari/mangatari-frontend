import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link
        to="/"
        style={{ fontWeight: "bold", fontSize: "1.2rem", textDecoration: "none", color: "inherit" }}
      >
        Mangatari
      </Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/mangas" style={{ textDecoration: "none", color: "inherit" }}>
          Manga
        </Link>
        <Link to="/animes" style={{ textDecoration: "none", color: "inherit" }}>
          Anime
        </Link>
        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
          About
        </Link>
        <span>Logout</span>
      </div>
    </nav>
  );
}

export default Navbar;