import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await client.post("/auth/register", {
        email,
        password,
      });

      const response = await client.post("/auth/login", {
        email,
        password,
      });

      login(email, response.data.access_token);

      navigate("/");
    } catch (err) {
      console.log("Full error:", err);
      console.log("Response:", err.response);
      setError(err.response?.data?.detail || "Registration failed");
    }
  }

  return (
    <main className="register-page">
      <div className="logo">
        <img src="/logo.png" alt="Resume Evaluator" />
      </div>
      <div className="register-form-container">
        <form
          id="register-form"
          action="/register"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
