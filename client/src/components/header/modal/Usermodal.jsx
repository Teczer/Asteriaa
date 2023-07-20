import { Link } from "react-router-dom";
import { useLogout } from "../../../../hooks/useLogout";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function Usermodal({ setUserModal, setIsChangingProfilePicture }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
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
      <Link to="/login">
        <input type="submit" value="SE DÉCONNECTER" onClick={handleClick} />
      </Link>
    </div>
  );
}

export default Usermodal;
