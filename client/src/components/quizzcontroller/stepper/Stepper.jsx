import classNames from "classnames";
import React from "react";
import "./stepper.scss";

function Stepper({ currentQuestion1 }) {
  return (
    <div className="stepper-container">
      <div className="step-circle step-finished"></div>
      <div className="bar-step-container">
        {/* PREMIERE ETAPE */}
        <div
          style={{ width: currentQuestion1 >= 2 ? "100%" : "0%" }}
          className="animation-step"
        ></div>
      </div>
      {/* CERCLE DU MILIEU */}
      <div
        className={classNames(
          "step-circle",
          currentQuestion1 >= 2 && "step-finished"
        )}
      ></div>
      {/* DERNIERE ETAPE */}
      <div className="bar-step-container">
        <div
          style={{ width: currentQuestion1 >= 3 ? "100%" : "0%" }}
          className="animation-step"
        ></div>
      </div>
      {/* DERNIER CERCLE */}
      <div
        className={classNames(
          "step-circle",
          currentQuestion1 >= 3 && "step-finished"
        )}
      ></div>
    </div>
  );
}

export default Stepper;
