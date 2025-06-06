import React from "react";

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
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Mangatari</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <span>Manga</span>
        <span>Anime</span>
        <span>Logout</span>
      </div>
    </nav>
  );
}

export default Navbar;