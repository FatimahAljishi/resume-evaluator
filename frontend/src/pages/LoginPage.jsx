import { useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await client.post("/auth/login", {
        email,
        password,
      });

      const meResponse = await client.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      login(email, response.data.access_token, meResponse.data.role);

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <main className="login-page">
      <div className="logo">
        <img src="/logo.png" alt="Resume Evaluator" />
      </div>
      <div className="login-form-container">
        <form
          id="login-form"
          action="/login"
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}
