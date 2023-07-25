import axios from "axios";
import { useState } from "react";
import AlertModal from "../header/modal/AlertModal";
import { useAuthContext } from "../../../hooks/useAuthContext";

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
  const [modal, setModal] = useState(false);
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
