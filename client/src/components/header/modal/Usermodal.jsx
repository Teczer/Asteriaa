import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function Usermodal({ setUserModal, setIsChangingProfilePicture }) {
  const { user, logoutUser } = useAuthContext();

  const handleLogout = () => {
    // Appel de la fonction 'logoutUser' pour se déconnecter
    logoutUser();
    // Faire tout autre traitement nécessaire après la déconnexion
    // Par exemple, rediriger l'utilisateur vers la page de connexion, etc.
  };

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
          className="to-user-page"
          to="/settings/profile"
          onClick={() => setUserModal(false)}
        >
          Gérer votre compte Asteria
        </Link>
      </div>
      <Link
        onClick={handleLogout}
        to="login"
        className="modal-user-notconnected-inscription --usermodal"
      >
        Se deconnecter
      </Link>
    </div>
  );
}

export default Usermodal;
