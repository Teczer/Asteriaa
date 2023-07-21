import React from "react";
import "../../quizzcontroller/quizzcontroller.scss";

function AlertModal({ setModal, submitValue, submitFunction, modalMessage }) {
  return (
    <div className="backToHomeModal">
      <h3 className="backtohome-title">
        Êtes vous sûr de vouloir {modalMessage} ?
      </h3>
      <a href="/">
        <input onClick={submitFunction} type="submit" value={submitValue} />
      </a>
      <div className="cancelBackToHome" onClick={() => setModal(false)}>
        <input type="submit" value="ANNULER" />
      </div>
    </div>
  );
}

export default AlertModal;
