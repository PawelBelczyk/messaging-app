 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
           
        </div>

        <h1>Messaging App</h1>

        <p className="login-description">
          Sign in to continue
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </label>

          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>

        <div className="register-prompt">
          <span>Don't have an account?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

