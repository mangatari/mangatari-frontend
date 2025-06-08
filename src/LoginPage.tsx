import { useState, useContext } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import "./App.css"; 

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { storeToken, authenticateUser } = authContext;

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        const data = response.data as { authToken: string };
        storeToken(data.authToken);
        authenticateUser();
        navigate("/events");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-container">
    <form onSubmit={handleLoginSubmit}>
      <h3>Login</h3>
  
      <label htmlFor="email" className="login-label">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleEmail}
        className="login-input"
        autoComplete="off"
      />
  
      <label htmlFor="password" className="login-label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handlePassword}
        className="login-input"
        autoComplete="off"
      />
  
      <button type="submit" className="login-button">
        Log In
      </button>
  
      {errorMessage && <p className="error-message">{errorMessage}</p>}
  
      <p style={{ marginTop: "2rem", fontSize: "0.55rem" }}>
        Don’t have an account yet?
      </p>
      <Link to="/signup" className="login-label" style={{ textDecoration: 'underline' }}>
        Sign Up
      </Link>
    </form>
  </div>
  );
}

export default LoginPage;