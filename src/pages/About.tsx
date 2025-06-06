import React from "react";

function AboutPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>About Mangatari</h1>
      <p style={{ marginTop: "1rem" }}>
        <strong>Mangatari</strong> is a web platform dedicated to anime and manga enthusiasts. Whether you're looking to discover new series, track your favorites, or just explore what the world of Japanese storytelling has to offer — Mangatari is your companion.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Our Mission</h2>
      <p>
        We built Mangatari to create a seamless and visually clean way to connect with anime and manga content. Our goal is to help fans manage their watchlists, explore recommendations, and celebrate the creativity of the medium.
      </p>

      <h2 style={{ marginTop: "2rem" }}>The Team</h2>
      <ul>
        <li><strong>Loop Troop</strong> – A dedicated group of developers from the Ironhack 2025 cohort.</li>
        <li><strong>Frontend Developers:</strong> React wizards with a passion for clean design.</li>
        <li><strong>Backend Developers:</strong> API architects making sure your data is fast, safe, and reliable.</li>
        <li><strong>Design & UX:</strong> Crafted with user joy in mind.</li>
      </ul>

      <p style={{ marginTop: "1rem" }}>
        Built during the Ironhack 2025 Web Development Bootcamp, Mangatari is a collaborative project that reflects our team's love for both technology and storytelling.
      </p>
    </div>
  );
}

export default AboutPage;