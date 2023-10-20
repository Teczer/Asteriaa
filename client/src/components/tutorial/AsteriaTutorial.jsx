import React, { useState } from "react";
import "./asteriaTutorial.scss";
import image from "./launchlogo@3x 2.png";
import cardimage from "./Group 72.png";
import collectionimage from "./Group 63.png";
import snappi from "./MascotHappyFace.svg";
import textbulle from "./Component 7.svg";

function AsteriaTutorial() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="tutorial-content">
            <img
              className="asteria-tutorial-logo"
              src={image}
              alt="Asterialogo"
              style={{ top: "30%" }}
            />
            <p className="tutorial-paragraph">
              Bienvenue sur Asteria ! Ici, le but est d’en apprendre plus sur
              l’Univers, ce monde <b>lointain et mystérieux</b> qui nous
              entoure...
            </p>
          </div>
        );
      case 2:
        return (
          <div className="tutorial-content">
            <img
              className="asteria-tutorial-logo"
              src={cardimage}
              alt="Asterialogo"
            />
            <p className="tutorial-paragraph">
              <b>Répond</b> à des questions et améliore tes connaissances...
            </p>
          </div>
        );
      case 3:
        return (
          <div className="tutorial-content">
            <img
              className="asteria-tutorial-logo"
              src={collectionimage}
              alt="Asterialogo"
              style={{ top: "10%" }}
            />
            <p className="tutorial-paragraph">
              ...et <b>remporte</b> de magnifiques cartes à collectionner !
            </p>
          </div>
        );
      case 4:
        return (
          <div className="tutorial-content">
            <img
              className="asteria-tutorial-logo"
              src={snappi}
              alt="Asterialogo"
              style={{ top: "30%" }}
            />
            <img
              className="asteria-tutorial-logo snappi"
              src={textbulle}
              alt="Asterialogo"
              style={{ top: "20%" }}
            />
            <p className="tutorial-paragraph">
              Prépare-toi à explorer l'infini avec Astéria !
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tutorial-container">
      <div className="tutorial-content-container">{renderStepContent()}</div>
      <div className="tutorial-navigation">
        <div
          className={`arrow-step-tutorial ${step != 1 ? "" : "--disabled"}`}
          onClick={handlePrevStep}
          disabled={step === 1}
        >
          <i className="fa-solid fa-chevron-left" />
        </div>
        <div
          className={`arrow-step-tutorial ${step != 4 ? "" : "--disabled"}`}
          onClick={handleNextStep}
          disabled={step === 4}
        >
          <i className="fa-solid fa-chevron-right" />
        </div>
      </div>
      {step === 4 && (
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
          Commencer
        </button>
      )}
    </div>
  );
}

export default AsteriaTutorial;
