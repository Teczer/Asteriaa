import React, { useState } from "react";
import { useSignup } from "../../../hooks/useSignup";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./signup.scss";
import image from "../login/launchlogo@3x 2.png";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { signup, error, isLoading, sendVerificationEmail } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, userName);
    console.log(email, password, userName);
    console.log("joriszs", user);

    if (user) {
      sendVerificationEmail(user.email, user._id);
    }
  };
  return (
    <main className="login-screen">
      <img className="asteria-login-logo" src={image} alt="Asterialogo" />
      <h1 className="sign-up-title">
        Inscrivez-vous chez <span className="asteria-name"> Asteria </span> !
      </h1>
      <section className="loginform-container --sign">
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
