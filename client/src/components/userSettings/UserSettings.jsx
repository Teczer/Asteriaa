import React from "react";
import "./userSettings.scss";
import PropertyController from "./PropertyController";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ArticleSkeletons from "../skeletons/ArticleSkeletons";

function UserSettings() {
  //   const { user } = useAuthContext();
  const user = null;

  if (!user) {
    // Si l'utilisateur n'est pas disponible, vous pouvez afficher un message de chargement
    // ou rediriger vers une autre page (par exemple, la page de connexion) ici.
    return <ArticleSkeletons />;
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
