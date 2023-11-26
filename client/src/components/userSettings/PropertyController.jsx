import axios from "axios";
import { useState } from "react";
import AlertModal from "../header/modal/AlertModal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DeleteUserModal from "./DeleteUserModal";
import { useNavigate } from "react-router-dom";
import {
  deleteUserNeedPassword,
  updateUser,
} from "../../../services/UserService";

function PropertyController({
  user,
  setIsChangingProfilePicture,
  propertyControllerType,
}) {
  // USERNAME
  const [userName, setUserName] = useState(user.userName);
  const [isChanchingUsername, setIsChanchingUsername] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [goodResponse, setGoodResponse] = useState(false);
  // PASSWORD
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [errorPasswordMsg, setErrorPasswordMsg] = useState(null);
  const [goodDeleteUserResponse, setGoodDeleteUserResponse] = useState(false);

  const [modal, setModal] = useState(false);
  const { updateUserContext, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  async function resetProgression() {
    try {
      // Utilisez la fonction updateUser pour mettre à jour l'utilisateur
      const updatedUser = await updateUser(user._id, {
        quizzSystemeSolaire: 1,
        quizzGalaxies: 1,
        quizzPhenomenesObservables: 1,
        quizzAstronautes: 1,
      });

      // Mettez à jour le contexte avec les nouvelles données utilisateur
      updateUserContext(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    }
  }

  // FONCTION POUR CHANGER D'USERNAME

  async function changeUsername() {
    try {
      // Utilisez la fonction updateUser pour mettre à jour l'utilisateur
      const updatedUser = await updateUser(user._id, { userName: userName });

      // Mettez à jour le contexte avec les nouvelles données utilisateur
      updateUserContext(updatedUser);

      // Fonction pour réinitialiser l'entrée du pseudo et l'état isChanchingUsername
      setUserName(updatedUser.userName);
      setIsChanchingUsername(false);
      setGoodResponse(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
      setErrorMsg(error.response.data.error);
    }
  }

  // FONCTION POUR SUPPRIMER L'UTILISATEUR

  async function deleteUser() {
    try {
      const response = await deleteUserNeedPassword(user._id, password);
      setErrorPasswordMsg(null);
      if (response.status === 200) {
        setGoodDeleteUserResponse(true);
      }
      setIsTypingPassword(false);
      setTimeout(async () => {
        try {
          // Appel de la fonction 'logoutUser' pour se déconnecter/vider l'app
          logoutUser();
          // Navigation vers login
          navigate("/login");
        } catch (updateError) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur : ",
            updateError
          );
        }
      }, 1500);
    } catch (error) {
      const { response } = error;

      setErrorPasswordMsg(response.data.error);

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
    setErrorPasswordMsg(null);

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
        <div className="property-controller --progress">
          <div className="property-container --progressup">
            <label className="label-title-property">Votre progression</label>
            <div className="property-button-input-label-wrapper">
              <div className="property-button-row-wrapper">
                <button
                  className="property-button --dangerous"
                  onClick={() => setModal(true)}
                >
                  Réinitialiser votre progression
                </button>
              </div>
              <p className="property-label-description">
                Attention vous ne pourrez plus revenir en arrière !
              </p>
            </div>
          </div>
          <div className="property-container --progressdown">
            <label className="label-title-property">Votre Compte</label>
            <div className="property-button-input-label-wrapper">
              <div className="property-button-row-wrapper">
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
            <DeleteUserModal
              setDeleteUserModal={setDeleteUserModal}
              password={password}
              handleTypingPassword={handleTypingPassword}
              user={user}
              isTypingPassword={isTypingPassword}
              goodDeleteUserResponse={goodDeleteUserResponse}
              errorPasswordMsg={errorPasswordMsg}
              deleteUser={deleteUser}
            />
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
