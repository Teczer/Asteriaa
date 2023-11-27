import React from "react";
import "../../quizzcontroller/quizzcontroller.scss";
import { Link } from "react-router-dom";

function AlertModal({ setModal, submitValue, submitFunction, modalMessage }) {
  return (
    <div className="backToHomeModal">
      <h3 className="backtohome-title">
        Êtes vous sûr de vouloir {modalMessage} ?
      </h3>
      <Link to="/">
        <input onClick={submitFunction} type="submit" value={submitValue} />
      </Link>
      <div className="cancelBackToHome" onClick={() => setModal(false)}>
        <input type="submit" value="ANNULER" />
      </div>
    </div>
  );
}

export default AlertModal;
