import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";

function Navbar() {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  const { isLoggedIn, user, logOutUser } = authContext;

  return (
    <nav className="pokemon-navbar">
      <NavLink to="/" className="pokemon-navbar-title">
        Mangatari
      </NavLink>

      <div className="pokemon-navbar-links">
        {isLoggedIn && (
          <>
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
              to="/favorites"
              data-tooltip="お気に入り"
              className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
            >
              Favorites
            </NavLink>
          </>
        )}

        <NavLink
          to="/about"
          data-tooltip="情報"
          className={({ isActive }) => `pokemon-menu-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>

        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <span className="pokemon-menu-link pokemon-username" data-tooltip="ユーザー名">
              <strong style={{ color: "black" }}>{user?.username}</strong>
            </span>
            <button onClick={logOutUser} className="pokemon-menu-link" data-tooltip="ログアウト">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
