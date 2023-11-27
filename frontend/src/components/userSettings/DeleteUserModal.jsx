import React from "react";
import { Link } from "react-router-dom";

function DeleteUserModal({
  setDeleteUserModal,
  password,
  handleTypingPassword,
  user,
  isTypingPassword,
  goodDeleteUserResponse,
  errorPasswordMsg,
  deleteUser,
}) {
  return (
    <div className="backToHomeModal" onClick={() => setDeleteUserModal(false)}>
      <div
        className="delete-user-modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="close-user-modal-btn --delete-user-modal"
          onClick={() => setDeleteUserModal(false)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
        <div className="delete-modal-title-logo">
          <img
            className="delete-modal-logo"
            src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670528238/asteriaLogo_af3kfh.svg"
            alt="Asteria"
          />
          <h4 className="delete-modal-title">Confirmez votre mot de passe</h4>
        </div>
        <div className="delete-modal-profilpicture-username">
          <figure className="figure-user-profile-picture --delete-user">
            <img
              className="user-profile-picture --modal --property-settings"
              src={user.profilePicture}
              alt="user-profil-picture"
            />
          </figure>
          <strong className="delete-modal-username">{user.userName}</strong>
        </div>
        <p className="delete-modal-alert-info">
          Pour votre sécurité, veuillez entrer votre mot de passe pour
          continuer.
        </p>
        {errorPasswordMsg && (
          <div className="property-catch-error --delete-user-modal">
            <i className="fa-solid fa-circle-minus" />
            <div className="error-link-wrap">
              <strong>{errorPasswordMsg}</strong>
              <Link className="delete-modal-forgot-password" to="/">
                <span>Mot de passe oublié ?</span>
              </Link>
            </div>
          </div>
        )}
        <div className="delete-modal-label-input">
          <label className="delete-modal-label">Mot de passe</label>
          <input
            className="input-username --overide"
            maxLength="16"
            required
            type="password"
            value={password}
            onChange={handleTypingPassword}
          />
        </div>
        <Link className="delete-modal-forgot-password" to="/">
          <span>Mot de passe oublié ?</span>
        </Link>
        <div className="delete-modal-button-wrapper">
          <button
            className={`property-button --delete-modal ${
              isTypingPassword
                ? "--delete-modal-allowed"
                : "--delete-modal-validator"
            } ${goodDeleteUserResponse ? "--goodResponse" : ""}`}
            onClick={() => {
              isTypingPassword ? deleteUser() : null;
            }}
          >
            {goodDeleteUserResponse ? (
              <i className="fa-solid fa-check" />
            ) : (
              "Vérifier"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
