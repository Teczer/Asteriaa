import axios from "axios";
import React, { useState } from "react";
import { useSignup } from "../../../hooks/useSignup";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./signup.scss";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  async function toSetDb() {
    const response = await axios.post(
      "http://localhost:5001/workouts",
      {
        profilePicture:
          "https://static-cdn.jtvnw.net/user-default-pictures-uv/ead5c8b2-a4c9-4724-b1dd-9f00b46cbd3d-profile_image-70x70.png",
        quizzSystemeSolaire: 1,
        quizzGalaxies: 1,
        quizzPhenomenesObservables: 1,
        quizzAstronautes: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
    console.log(email, password);
    await console.log("joriszs", user);
    toSetDb();
  };
  return (
    <main className="login-screen">
      <h1>
        Inscrivez-vous chez <span className="asteria-name"> Asteria </span> !
      </h1>
      <section className="loginform-container">
        <div id="login">
          <form
            className="login-form" /* onSubmit={this.onSubmit} */
            onSubmit={handleSubmit}
          >
            <span className="fa fa-user" />
            <input
              // rome-ignore lint/a11y/noAutofocus: <explanation>
              autoFocus
              maxLength="25"
              /* onChange={this.handleChange.bind(this, "email")} */
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              /* value={this.state.user.email} */
              required
            />
            <span className="fa fa-lock" />
            <input
              autoComplete="off"
              maxLength="12"
              /* onChange={this.handleChange.bind(this, "password")} */
              placeholder="Mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              /* value={this.state.user.password} */
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
            Déjà Membre ? <a href="/login">Connexion</a>{" "}
            <span className="fa fa-arrow-right" />
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;
