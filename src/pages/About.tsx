import React from "react";
import "../App.css";

function AboutPage() {
  return (
    <div className="pixel-box" style={{ padding: "2rem", maxWidth: "800px", margin: "2rem auto" }}>
      <h1 className="pokemon-title">About Mangatari</h1>

      <p className="pixel-text" style={{ marginTop: "1rem" }}>
        <strong>Mangatari</strong> is a nostalgic web portal crafted for anime and manga fans. Whether you're exploring classics or the latest gems, Mangatari is your pixel-perfect companion.
      </p>

      <h2 className="section-heading" style={{ marginTop: "2rem" }}>🎯 Our Mission</h2>
      <div className="mission-box">
        <p className="pixel-text">
          We aim to bring fans a clean, retro-inspired way to explore and track their favorite anime and manga. Mangatari is all about joy, discovery, and community.
        </p>
      </div>

      <h2 className="section-heading" style={{ marginTop: "2rem" }}>👾 The Team</h2>
      <ul className="team-list pixel-text">
        <li><strong>Loop Troop</strong> – Developers from Ironhack 2025 who level up together.</li>
        <li><strong>Frontend:</strong> React warriors wielding pixel swords of design.</li>
        <li><strong>Backend:</strong> API ninjas ensuring speed and security.</li>
        <li><strong>UX & Design:</strong> Crafted to delight, 8-bit style.</li>
      </ul>

      <p className="pixel-text" style={{ marginTop: "1rem" }}>
        This platform was born at the Ironhack 2025 Web Dev Bootcamp — where code meets creativity.
      </p>
    </div>
  );
}

export default AboutPage;
