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
          data-tooltip="漫画"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          Manga
        </NavLink>
        <NavLink
          to="/animelist"
          data-tooltip="アニメ"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          Anime
        </NavLink>
        <NavLink
          to="/about"
          data-tooltip="情報"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>
        <NavLink
          to="/signup"
          data-tooltip="登録"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          data-tooltip="ログイン"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          Login
        </NavLink>
        <button onClick={handleLogout} className="pokemon-menu-link" data-tooltip="ログアウト">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
