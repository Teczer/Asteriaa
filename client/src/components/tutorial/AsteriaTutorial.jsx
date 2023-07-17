import React from "react";
import "./asteriaTutorial.scss";

function AsteriaTutorial() {
  return (
    <div className="tutorial-container">
      <h1 style={{ textAlign: "center" }}>
        &#9888; TUTORIEL EN PHASE DE CONSTRUCTION &#9888;
      </h1>
      <button
        className="tutorial-btn"
        onClick={() => {
          localStorage.setItem("quizzSystemeSolaire", 1);
          localStorage.setItem("quizzGalaxies", 1);
          localStorage.setItem("quizzPhenomenesObservables", 1);
          localStorage.setItem("quizzAstronautes", 1);
          localStorage.setItem("completedTutorial", true);
          window.location.href = "/";
        }}
      >
        Continuer
      </button>
    </div>
  );
}

export default AsteriaTutorial;
