import React, { useState } from "react";
import "./userSettings.scss";
import PropertyController from "./PropertyController";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ProfileSettingsSkeletons from "../skeletons/ProfileSettingsSkeletons";
import ChangePictureModal from "../header/modal/ChangePictureModal";

function UserSettings() {
  const { user } = useAuthContext();
  const [isChangingProfilePicture, setIsChangingProfilePicture] =
    useState(false);

  if (!user) {
    // LOADER IF user is NULL, loading Skeleton...
    return <ProfileSettingsSkeletons />;
  }
  console.log("userUSERSETTINGS", user);

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
