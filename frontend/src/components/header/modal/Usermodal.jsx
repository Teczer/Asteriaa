import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

import { apiURL } from "../../../../services/UserService";

function Usermodal({ setUserModal, setIsChangingProfilePicture }) {
  const { user, logoutUser } = useAuthContext();
  const googleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    logoutUser();
    window.open(`${apiURL}/auth/logout`, "_self");
    window.location.href = "/login";
  };

  const handleLogout = () => {
    // Appel de la fonction 'logoutUser' pour se déconnecter
    logoutUser();
    // Faire tout autre traitement nécessaire après la déconnexion
    // Par exemple, rediriger l'utilisateur vers la page de connexion, etc.
  };

  console.log("user", user);

  return (
    <div className="user-controller-modal">
      <div className="user-controller-wrapper">
        <button
          className="close-user-modal-btn"
          onClick={() => setUserModal(false)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
        <div className="user-information-wrapper">
          <figure className="figure-user-profile-picture --modal">
            <img
              className="user-profile-picture --modal"
              src={user.profilePicture}
              alt="user-profil-picture"
            />
            <div className="btn-change-container">
              <button
                className="change-picture-btn"
                onClick={() => {
                  setIsChangingProfilePicture(true);
                  setUserModal(false);
                }}
              >
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>
          </figure>
          <div className="username-usermail-wrapper">
            <p className="username-modal">{user.userName}</p>
            <span className="usermail-modal">{user.email}</span>
          </div>
        </div>
        <Link
          className={`to-user-page ${user?.isAdmin ? "--admin" : ""}`}
          to="/settings/profile"
          onClick={() => setUserModal(false)}
        >
          Gérer votre compte Asteria
        </Link>
        {user?.isAdmin && (
          <Link
            className="to-user-page --admin"
            to="/admin/quizz"
            onClick={() => setUserModal(false)}
          >
            Back-Office Asteria
          </Link>
        )}
      </div>
      {user?.loginService === "google" ? (
        <button onClick={googleLogout} className="login-with-google-btn">
          Deconnexion
        </button>
      ) : (
        <Link
          onClick={handleLogout}
          to="login"
          className="modal-user-notconnected-inscription --usermodal"
        >
          Se deconnecter
        </Link>
      )}
    </div>
  );
}

export default Usermodal;
