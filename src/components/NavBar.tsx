import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { NavLink } from "react-router-dom";
import "../App.css"; // make sure this is imported
>>>>>>> 0fc0c85 (feat: Add Mantine UI components and styles, implement routing for new pages)

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or your desired logout behavior
  };

  return (
<<<<<<< HEAD
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
=======
    <nav className="pokemon-navbar">
      <NavLink to="/" className="pokemon-navbar-title">
        Mangatari
      </NavLink>
      <div className="pokemon-navbar-links">
        <NavLink
          to="/mangalist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Manga
        </NavLink>
        <NavLink
          to="/animelist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Anime
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
>>>>>>> 0fc0c85 (feat: Add Mantine UI components and styles, implement routing for new pages)
      </div>
    </nav>
  );
}

export default Navbar;