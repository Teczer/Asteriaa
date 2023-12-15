import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../../../hooks/useLogin";
import image from "./launchlogo@3x 2.png";

import "./login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <main className="login-screen">
      <img
        className="asteria-login-logo"
        src={image}
        alt="Asterialogo"
        loading="lazy"
      />
      <div className="login-form-wrapper">
        <h1 className="login-title">
          Bienvenue sur <span className="asteria-name">Asteria</span>,
          veuillez-vous authenthifier
        </h1>
        <section className="loginform-container">
          <div id="login">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="fa fa-user" />
              <input
                autoFocus
                maxLength="25"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <span className="fa fa-lock" />
              <input
                autoComplete="off"
                maxLength="12"
                placeholder="Mot de passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <input
                type="submit"
                value="Se connecter"
                disabled={isLoading}
                style={{ marginBottom: "1em" }}
              />
              {/* <a
                role="button"
                href="http://localhost:5001/auth/google"
                className="login-with-google-btn"
              >
                Sign in with Google
              </a> */}
              {error && (
                <div className="error" style={{ color: "red" }}>
                  {error}
                </div>
              )}
            </form>
          </div>
          <div className="notmember-container">
            <p>
              Pas membre ? <Link to="/signup">Inscription</Link>{" "}
              <span className="fa fa-arrow-right" />
            </p>
          </div>
          <Link className="invited-mode-link" to="/">
            Mode invité
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Login;
