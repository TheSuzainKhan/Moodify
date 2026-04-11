import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/auth.scss"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  return (
    <main className="auth-page">
      <header className="auth-page__nav">
        <Link className="auth-page__brand" to="/login">Moodify</Link>
        <Link className="auth-page__nav-link" to="/login">Login</Link>
      </header>

      <section className="auth-page__hero">
        <div className="auth-page__copy">
          <p className="auth-page__eyebrow">Create account</p>
          <h1>Join Moodify and turn facial expression into a playable soundtrack.</h1>
          <p>
            Build your account to unlock expression-based playlists, richer player controls,
            and a cleaner listening flow from detection to playback.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card__head">
            <p className="auth-card__eyebrow">Register</p>
            <h2>Start with Moodify</h2>
            <span>Create your profile in a few seconds.</span>
          </div>

          <form className="auth-card__form" onSubmit={handleSubmit}>
            <FormGroup
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label='Username'
              placeholder='Enter your username'
            />
            <FormGroup
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label='Email'
              type="email"
              placeholder='you@example.com'
            />
            <FormGroup
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              type="password"
              placeholder="Create a password"
            />
            <button className="button auth-card__submit" disabled={loading} type="submit">
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="auth-card__switch">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Register
