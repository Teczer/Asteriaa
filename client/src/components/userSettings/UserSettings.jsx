import React from "react";
import "./userSettings.scss";
import PropertyController from "./PropertyController";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ProfileSettingsSkeletons from "../skeletons/ProfileSettingsSkeletons";

function UserSettings() {
  const { user } = useAuthContext();

  if (!user) {
    // LOADER IF user is NULL, loading Skeleton...
    return <ProfileSettingsSkeletons />;
  }
  console.log("userUSERSETTINGS", user);

  return (
    <main className="userSettings-main">
      <header className="userSettings-header">
        <h1 className="userSettings-main-title">Paramètres</h1>
      </header>
      <section className="userSettings-section">
        <h3 className="property-title">Photo de profil</h3>
        <PropertyController user={user} />
        <h3 className="property-title">Pseudo</h3>
        <PropertyController user={user} />
        <h3 className="property-title">Progression</h3>
        <PropertyController user={user} />
      </section>
    </main>
  );
}

export default UserSettings;
