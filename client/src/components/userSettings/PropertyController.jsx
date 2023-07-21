import axios from "axios";
import { useState } from "react";
import AlertModal from "../header/modal/AlertModal";

function PropertyController({
  user,
  setIsChangingProfilePicture,
  propertyControllerType,
}) {
  const [userName, setUserName] = useState(user.userName);
  const [isChanchingUsername, setIsChanchingUsername] = useState(false);
  const [modal, setModal] = useState(false);

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

    console.log(afterpatch);
    console.log("user", user);
  }

  // Fonction pour gérer les modifications dans l'entrée du pseudo
  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    // Vérifier si la valeur de l'entrée est différente de la valeur initiale du pseudo
    setIsChanchingUsername(e.target.value !== user.userName);
  };

  // Fonction pour réinitialiser l'entrée du pseudo et l'état isChanchingUsername
  const resetUsername = () => {
    setUserName(user.userName);
    setIsChanchingUsername(false);
  };

  return (
    <>
      {/* IMAGE */}
      {propertyControllerType === "image" && (
        <div className="property-controller">
          <div className="property-container">
            <figure
              className="figure-user-profile-picture --modal"
              style={{ marginRight: "4rem" }}
            >
              <img
                className="user-profile-picture --modal"
                src={user.profilePicture}
                alt="user-profil-picture"
              />
            </figure>
            <div className="property-button-input-label-wrapper">
              <button
                className="property-button"
                onClick={() => setIsChangingProfilePicture(true)}
              >
                Mettre à jour la photo de profil
              </button>
              <p className="property-label-description">
                L’image ne doit pas dépasser 1GB et est soumis à un compressage.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* PSEUDO */}
      {propertyControllerType === "pseudo" && (
        <div className="property-controller">
          <div className="property-container">
            <button
              className={`property-button ${
                isChanchingUsername ? "--allowed" : "--validator"
              }`}
              onClick={resetUsername}
            >
              Enregistrer les modifications
            </button>
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
              <p className="property-label-description">
                Vous pouvez mettre à jour votre pseudonyme.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* PROGRESSION */}
      {propertyControllerType === "progress" && (
        <div className="property-controller">
          <div className="property-container">
            <label className="label-title-property">Votre progression</label>
            <div className="property-button-input-label-wrapper">
              <button
                className="property-button --dangerous"
                onClick={() => setModal(true)}
              >
                Réinitialiser votre progression
              </button>
              <p className="property-label-description">
                Attention vous ne pourrez plus revenir en arrière !
              </p>
            </div>
          </div>
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
