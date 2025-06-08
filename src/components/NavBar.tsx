import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css"; // make sure this is imported

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or your desired logout behavior
  };

  return (
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
      </div>
    </nav>
  );
}

export default Navbar;