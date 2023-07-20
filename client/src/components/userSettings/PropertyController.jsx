import React from "react";

function PropertyController({ user }) {
  console.log("userPROFILEPICTUREPROPERTY", user);

  if (!user) {
    // Si l'utilisateur n'est pas disponible, vous pouvez afficher un message de chargement
    // ou gérer l'affichage en conséquence ici.
    return null;
  }

  return (
    <div className="property-controller">
      <div className="property-container">
        <figure className="figure-user-profile-picture --modal">
          <img
            className="user-profile-picture --modal"
            src={user.profilePicture}
            alt="user-profil-picture"
          />
        </figure>
        <button className="property-button">
          Mettre à jour la photo de profil
        </button>
      </div>
    </div>
  );
}

export default PropertyController;
