import axios from "axios";
import { useState } from "react";
import AlertModal from "../header/modal/AlertModal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function PropertyController({
  user,
  setIsChangingProfilePicture,
  propertyControllerType,
}) {
  const [userName, setUserName] = useState(user.userName);
  const [errorMsg, setErrorMsg] = useState(null);
  const [goodResponse, setGoodResponse] = useState(false);
  console.log("errorMsg", errorMsg);
  const [isChanchingUsername, setIsChanchingUsername] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(true);
  const { updateUser } = useAuthContext();

  async function resetProgression() {
    const response = await axios.patch(
      `http://146.59.150.192:5001/user/${user._id}`,
      {
        quizzSystemeSolaire: 1,
        quizzGalaxies: 1,
        quizzPhenomenesObservables: 1,
        quizzAstronautes: 1,
      }
    );

    console.log("response.data", response.data);

    const afterpatch = axios.get(`http://146.59.150.192:5001/user/${user._id}`);

    const updatedUserData = afterpatch.data;

    // Utilisez la fonction updateUser du contexte pour mettre à jour les données dans le localStorage et dans le contexte.
    updateUser(updatedUserData);

    // dispatch({ type: "UPDATE_USER", payload: afterpatch.data });

    console.log("afterpatchUSERNAME", afterpatch);
    console.log("useFromChanger", user);

    console.log(afterpatch);
    console.log("user", user);
  }

  // FONCTION POUR CHANGER D'USERNAME

  async function changeUsername() {
    try {
      const response = await axios.patch(
        `http://146.59.150.192:5001/user/${user._id}`,
        { userName: userName }
      );

      setErrorMsg(null);

      console.log("response", response);

      const afterpatch = await axios.get(
        `http://146.59.150.192:5001/user/${user._id}`
      );

      const updatedUserData = afterpatch.data;

      // Utilisez la fonction updateUser du contexte pour mettre à jour les données dans le localStorage et dans le contexte.
      updateUser(updatedUserData);

      // dispatch({ type: "UPDATE_USER", payload: afterpatch.data });

      console.log("afterpatchUSERNAME", afterpatch);
      console.log("useFromChanger", user);

      // Fonction pour réinitialiser l'entrée du pseudo et l'état isChanchingUsername
      setUserName(afterpatch.data.userName);
      setIsChanchingUsername(false);

      if (response.status === 200) {
        setGoodResponse(true);
      }
    } catch (error) {
      const { response } = error;

      setErrorMsg(response.data.error);

      return;
    }
  }

  // Fonction pour gérer les modifications dans l'entrée du pseudo
  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    // Vérifier si la valeur de l'entrée est différente de la valeur initiale du pseudo
    setIsChanchingUsername(e.target.value !== user.userName);
  };

  // Fonction pour gérer les modifications dans l'entrée du pseudo
  const handleTypingPassword = (e) => {
    setPassword(e.target.value);
    setIsTypingPassword(true);

    if (e.target.value === "") {
      setIsTypingPassword(false);
    }
  };

  return (
    <>
      {/* IMAGE */}
      {propertyControllerType === "image" && (
        <div className="property-controller">
          <div className="property-container">
            <figure className="figure-user-profile-picture --modal">
              <img
                className="user-profile-picture --modal --property-settings"
                src={user.profilePicture}
                alt="user-profil-picture"
              />
            </figure>
            <div className="property-button-input-label-wrapper --image-type">
              <button
                className="property-button"
                onClick={() => setIsChangingProfilePicture(true)}
              >
                Mettre à jour la photo de profil
              </button>
              <p className="property-label-description">
                L’image ne doit pas dépasser <b>5MB</b> et est soumis à un
                compressage.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* PSEUDO */}
      {propertyControllerType === "pseudo" && (
        <div className="property-controller">
          <div className="property-container --pseudo-type">
            <button
              className={`property-button ${
                isChanchingUsername ? "--allowed" : "--validator"
              } ${goodResponse ? "--goodResponse" : ""}`}
              onClick={() => {
                isChanchingUsername ? changeUsername() : null;
              }}
            >
              {goodResponse ? (
                <i className="fa-solid fa-check" />
              ) : (
                "Enregistrer les modifications"
              )}
            </button>
            {errorMsg && <div className="property-catch-error">{errorMsg}</div>}
            <label className="label-title-property">Pseudo Affiché</label>
            <div className="property-button-input-label-wrapper">
              <input
                className="input-username --overide"
                maxLength="16"
                placeholder="Username"
                type="text"
                onChange={handleUsernameChange}
                value={userName}
                required
              />
              <p
                className="property-label-description"
                style={{
                  marginBottom: "20px",
                }}
              >
                Vous pouvez mettre à jour votre pseudonyme.
              </p>
              <div className="input-username --overide --block">
                {user.email}
              </div>
            </div>
            <div className="property-button-input-label-wrapper"></div>
          </div>
        </div>
      )}
      {/* PROGRESSION */}
      {propertyControllerType === "progress" && (
        <div className="property-controller">
          <div className="property-container">
            <label className="label-title-property">Votre progression</label>
            <div className="property-button-input-label-wrapper">
              <div className="property-button-row-wrapper">
                <button
                  className="property-button --dangerous"
                  onClick={() => setModal(true)}
                >
                  Réinitialiser votre progression
                </button>
                <button
                  className="property-button --dangerous"
                  onClick={() => setDeleteUserModal(true)}
                >
                  Supprimer votre compte
                </button>
              </div>
              <p className="property-label-description">
                Attention vous ne pourrez plus revenir en arrière !
              </p>
            </div>
          </div>
          {deleteUserModal && (
            <div
              className="backToHomeModal"
              onClick={() => setDeleteUserModal(false)}
            >
              <div
                className="delete-user-modal-container"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="delete-modal-title-logo">
                  <img
                    className="delete-modal-logo"
                    src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670528238/asteriaLogo_af3kfh.svg"
                    alt="Asteria"
                  />
                  <h4 className="delete-modal-title">
                    Confirmez votre mot de passe
                  </h4>
                </div>
                <div className="delete-modal-profilpicture-username">
                  <figure className="figure-user-profile-picture --delete-user">
                    <img
                      className="user-profile-picture --modal --property-settings"
                      src={user.profilePicture}
                      alt="user-profil-picture"
                    />
                  </figure>
                  <strong className="delete-modal-username">
                    {user.userName}
                  </strong>
                </div>
                <p className="delete-modal-alert-info">
                  Pour votre sécurité, veuillez entrer votre mot de passe pour
                  continuer.
                </p>
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
                    } ${goodResponse ? "--goodResponse" : ""}`}
                    onClick={() => {
                      isTypingPassword ? changeUsername() : null;
                    }}
                  >
                    {goodResponse ? (
                      <i className="fa-solid fa-check" />
                    ) : (
                      "Vérifier"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {modal && (
            <AlertModal
              submitFunction={resetProgression}
              setModal={setModal}
              submitValue="RÉINITIALISER"
              modalMessage="réinitialiser votre progression"
            />
          )}
        </div>
      )}
    </>
  );
}

export default PropertyController;
