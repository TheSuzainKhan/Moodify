import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/auth.scss";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <main className="auth-page">
      <header className="auth-page__nav">
        <Link className="auth-page__brand" to="/login">Moodify</Link>
        <Link className="auth-page__nav-link" to="/register">Create account</Link>
      </header>

      <section className="auth-page__hero">
        <div className="auth-page__copy">
          <p className="auth-page__eyebrow">Welcome back</p>
          <h1>Sign in and continue your mood-based playlist journey.</h1>
          <p>
            Detect your expression, generate an English playlist, and jump straight
            into the track that fits your mood.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card__head">
            <p className="auth-card__eyebrow">Login</p>
            <h2>Access your account</h2>
            <span>Enter your details to open Moodify.</span>
          </div>

          <form className="auth-card__form" onSubmit={handleSubmit}>
            <FormGroup
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <FormGroup
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <button className="button auth-card__submit" disabled={loading} type="submit">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="auth-card__switch">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
