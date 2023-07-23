import React, { useEffect, useState } from "react";
import "./userSettings.scss";
import PropertyController from "./PropertyController";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ProfileSettingsSkeletons from "../skeletons/ProfileSettingsSkeletons";
import ChangePictureModal from "../header/modal/ChangePictureModal";

function UserSettings() {
  const { user } = useAuthContext();
  const [isChangingProfilePicture, setIsChangingProfilePicture] =
    useState(false);

  useEffect(() => {
    // Cette fonction sera appelée chaque fois que la valeur de 'user' change.
    // Vous pouvez accéder à la nouvelle valeur de 'user' ici et effectuer les actions nécessaires.
    if (user) {
      console.log("Nouvel utilisateur:", user);
      // Effectuez ici les actions appropriées en fonction de la nouvelle valeur de 'user'.
      // Par exemple, vous pouvez mettre à jour certaines parties du composant en fonction de 'user'.
      // Ou vous pouvez effectuer des requêtes supplémentaires en fonction de 'user', etc.
    }
  }, [user]); // Nous utilisons 'user' comme dépendance pour déclencher l'effet lorsque 'user' change.

  if (!user) {
    // LOADER IF user is NULL, loading Skeleton...
    return <ProfileSettingsSkeletons />;
  }

  return (
    <main className="userSettings-main">
      {isChangingProfilePicture && (
        <ChangePictureModal
          setIsChangingProfilePicture={setIsChangingProfilePicture}
        />
      )}
      <header className="userSettings-header">
        <h1 className="userSettings-main-title">Paramètres</h1>
      </header>
      <section className="userSettings-section">
        <h3 className="property-title">Photo de profil</h3>
        <PropertyController
          propertyControllerType="image"
          user={user}
          setIsChangingProfilePicture={setIsChangingProfilePicture}
        />
        <h3 className="property-title">Pseudo</h3>
        <PropertyController propertyControllerType="pseudo" user={user} />
        <h3 className="property-title">Progression</h3>
        <PropertyController propertyControllerType="progress" user={user} />
      </section>
    </main>
  );
}

export default UserSettings;
