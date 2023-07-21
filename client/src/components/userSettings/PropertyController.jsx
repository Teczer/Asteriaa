import { useState } from "react";

function PropertyController({
  user,
  setIsChangingProfilePicture,
  propertyControllerType,
}) {
  const [userName, setUserName] = useState(user.userName);
  const [isChanchingUsername, setIsChanchingUsername] = useState(false);

  // Function to handle changes in the username input
  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    // Check if the input value is different from the initial username value
    setIsChanchingUsername(e.target.value !== user.userName);
  };

  // Function to reset the username input and isChanchingUsername state
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
            >
              Enregistrer les modifications
            </button>
            <label className="label-title-property">Pseudo Affiché</label>
            <div className="property-button-input-label-wrapper">
              <input
                className="input-username --overide"
                autoFocus
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
                onClick={() => setIsChangingProfilePicture(true)}
              >
                Rénistialliser votre progression
              </button>
              <p className="property-label-description">
                Attention vous ne pourrez plus revenir en arrière !
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyController;
