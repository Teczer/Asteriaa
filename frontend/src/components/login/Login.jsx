import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { apiURL } from "../../../services/UserService";
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

  const loginWithGoogle = () => {
    window.open(`${apiURL}/auth/google/callback`, "_self");
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
          veuillez-vous authentifier
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
              {error && (
                <div className="error" style={{ color: "red" }}>
                  {error}
                </div>
              )}
            </form>
            {/* <button onClick={loginWithGoogle} className="login-with-google-btn">
              Connexion Google
            </button> */}
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
