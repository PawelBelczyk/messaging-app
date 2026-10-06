import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="login-logo">M</div>

        <div className="auth-header">
          <h1>Create account</h1>
        </div>

        <p className="auth-subtitle">
          Register to start messaging
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </label>

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

          <label>
            Confirm password
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Repeat your password"
              required
            />
          </label>

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>

        <div className="auth-register">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
