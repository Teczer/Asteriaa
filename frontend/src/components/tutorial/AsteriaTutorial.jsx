import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Spinner } from "@chakra-ui/spinner";

import "./asteriaTutorial.scss";

function AsteriaTutorial() {
  useEffect(() => {
    document.title = "Asteria : Quizz, Space, Actus, Collections | Asteria";
  }, []);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleNextStep = () => {
    setIsLoading(false);
    if (step >= 4) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setIsLoading(false);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // test build

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="tutorial-content">
            {!isLoading && (
              <Spinner
                color="red.500"
                size="xl"
                style={{ width: "50px", height: "50px", position: "fixed" }}
              />
            )}
            <Spline
              onLoad={() => setIsLoading(true)}
              scene="https://prod.spline.design/TwiuJ2W9zb-0VG7k/scene.splinecode"
            />
          </div>
        );
      case 2:
        return (
          <div className="tutorial-content">
            {!isLoading && (
              <Spinner
                color="red.500"
                size="xl"
                style={{ width: "50px", height: "50px", position: "fixed" }}
              />
            )}
            <Spline
              onLoad={() => setIsLoading(true)}
              scene="https://prod.spline.design/po53pkcex0MAo07C/scene.splinecode"
            />
          </div>
        );
      case 3:
        return (
          <div className="tutorial-content">
            {!isLoading && (
              <Spinner
                color="red.500"
                size="xl"
                style={{ width: "50px", height: "50px", position: "fixed" }}
              />
            )}
            <Spline
              onLoad={() => setIsLoading(true)}
              scene="https://prod.spline.design/nq2Ddo1xg8yV2Kxd/scene.splinecode"
            />
          </div>
        );
      case 4:
        return (
          <div className="tutorial-content">
            {!isLoading && (
              <Spinner
                color="red.500"
                size="xl"
                style={{ width: "50px", height: "50px", position: "fixed" }}
              />
            )}
            <Spline
              onLoad={() => setIsLoading(true)}
              scene="https://prod.spline.design/4ndWoXGNrSmD2GAi/scene.splinecode"
            />
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
