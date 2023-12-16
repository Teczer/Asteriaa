import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../../../hooks/useLogin";
import image from "./launchlogo@3x 2.png";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import decode from "jsonwebtoken-esm/decode";

import "./login.scss";
import axios from "axios";

function Login() {
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log("data", data);
      } catch (error) {
        console.log("error", error);
      }
    },
  });

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
          {/* <button onClick={loginGoogle} className="login-with-google-btn">
            Sign in with Google
          </button> */}
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
              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decodedToken = decode(credentialResponse.credential); // Utilisez la fonction 'decode' de la librairie jsonwebtoken-esm
                  console.log(decodedToken);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}
              ;
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
