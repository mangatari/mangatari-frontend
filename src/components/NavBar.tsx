import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <nav className="pokemon-navbar">
      <NavLink to="/" className="pokemon-navbar-title">
        Mangatari
      </NavLink>
      <div className="pokemon-navbar-links">
        <NavLink
          to="/mangalist"
          data-tooltip="Manga"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          漫画
        </NavLink>
        <NavLink
          to="/animelist"
          data-tooltip="Anime"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          アニメ
        </NavLink>
        <NavLink
          to="/about"
          data-tooltip="About"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          情報
        </NavLink>
        <NavLink
          to="/signup"
          data-tooltip="Sign up"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          登録
        </NavLink>
        <NavLink
          to="/login"
          data-tooltip="Login"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          ログイン
        </NavLink>
        <button onClick={handleLogout} className="pokemon-menu-link" data-tooltip="Logout">
          ログアウト
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
