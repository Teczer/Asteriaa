import React from "react";
import Header from "../header/Header";
import "./notfound.scss";

function Notfound() {
  return (
    <>
      <section className="notfound-section">
        <div className="notfound-wrapper">
          <p>4</p>
          <img
            className="notfound-img"
            src="/src/assets/icons/asteriaLogo.svg"
            alt=""
          />
          <p>4</p>
        </div>
        <h2>
          Vous vous rapprochez d'un trou noir, veuillez faire demi tout le plus
          rapidement possible !
        </h2>
        <a href="/" className="sign-in">
          Retourner à l'accueil
        </a>
      </section>
    </>
  );
}

export default Notfound;
