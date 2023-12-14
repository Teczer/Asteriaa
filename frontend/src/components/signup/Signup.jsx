import React, { useState } from "react";
import { useSignup } from "../../../hooks/useSignup";
import { useAuthContext } from "../../../hooks/useAuthContext";
import image from "../login/launchlogo@3x 2.png";
import { Link } from "react-router-dom";
import { sendVerificationEmail } from "../../../services/UserService";

import "./signup.scss";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, userName);

    if (user) {
      console.log("user", user);
      sendVerificationEmail(user.email, user._id, user.userName);
    }
  };
  return (
    <main className="login-screen">
      <img
        className="asteria-login-logo"
        src={image}
        alt="Asterialogo"
        loading="lazy"
      />
      <section className="loginform-container --sign">
        <h1 className="sign-up-title">
          Inscrivez-vous chez <span className="asteria-name"> Asteria </span> !
        </h1>
        <div id="login">
          <form className="login-form " onSubmit={handleSubmit}>
            <span className="fa fa-user" />
            <input
              autoFocus
              maxLength="16"
              placeholder="Username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
            <span className="fa-solid fa-at" />
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
            <input type="submit" value="S'inscrire" disabled={isLoading} />
            {error && (
              <div className="error" style={{ color: "red" }}>
                {error}
              </div>
            )}
          </form>
        </div>
        <div className="notmember-container">
          <p>
            Déjà Membre ? <Link to="/login">Connexion</Link>{" "}
            <span className="fa fa-arrow-right" />
          </p>
        </div>
        <Link className="invited-mode-link" to="/">
          Mode invité
        </Link>
      </section>
    </main>
  );
}

export default Signup;
