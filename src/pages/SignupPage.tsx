import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css"; 


const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  // Tipando corretamente os eventos de input
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  // Tipando corretamente o evento de submit
  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password, username };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-container">
  <form onSubmit={handleSignupSubmit}>
    <h3>Sign Up</h3>

    <label htmlFor="email" className="signup-label">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      value={email}
      onChange={handleEmail}
      className="signup-input"
      autoComplete="off"
    />

    <label htmlFor="password" className="signup-label">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      value={password}
      onChange={handlePassword}
      className="signup-input"
      autoComplete="off"
    />

    <label htmlFor="name" className="signup-label">Username</label>
    <input
      type="text"
      name="username"
      id="username"
      value={username}
      onChange={handleName}
      className="signup-input"
      autoComplete="off"
    />

    <button type="submit" className="signup-button">Create Account</button>

    {errorMessage && <p className="error-message">{errorMessage}</p>}

    <p style={{ marginTop: "2rem", fontSize: "0.55rem" }}>Already have an account?</p>
    <Link to="/login" className="signup-label" style={{ textDecoration: 'underline' }}>
      Log in
    </Link>
  </form>
</div>
  );
}

export default SignupPage;