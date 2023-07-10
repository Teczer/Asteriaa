import { Link } from "react-router-dom";
import "./header.scss";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Usermodal from "./modal/Usermodal";
import Modalburger from "./modal/Modalburger";
import ChangePictureModal from "./modal/ChangePictureModal";

const Header = () => {
  const [modalBurger, setModalBurger] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [isChangingProfilePicture, setIsChangingProfilePicture] =
    useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    console.log("userFROMHEADER", user);
  }, [user]);
  return (
    <>
      <header className="header-asteria">
        {isChangingProfilePicture && (
          <ChangePictureModal
            setIsChangingProfilePicture={setIsChangingProfilePicture}
          />
        )}
        <button className="menu-burger">
          {!modalBurger && (
            <i className="fas fa-bars" onClick={() => setModalBurger(true)} />
          )}
          {modalBurger && (
            <i
              className="fa-solid fa-xmark"
              onClick={() => setModalBurger(false)}
            />
          )}
        </button>
        <a className="logo-container" href="/">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670528238/asteriaLogo_af3kfh.svg"
            alt="Asteria"
          />
        </a>
        {!modalBurger && (
          <div className="user-icon">
            <i className="fa-regular fa-user"></i>
          </div>
        )}
        <div className="nav-menu">
          <Link to="quizz">Quizz</Link>
          <Link to="news">Actualités</Link>
        </div>
        {user && (
          <div className="logout-wrapper">
            <figure
              className="figure-user-profile-picture"
              onClick={() => setUserModal(true)}
            >
              <img
                className="user-profile-picture"
                src={user.profilePicture}
                alt="user-profil-picture"
              />
            </figure>
            {userModal && (
              <Usermodal
                setUserModal={setUserModal}
                setIsChangingProfilePicture={setIsChangingProfilePicture}
              />
            )}
          </div>
        )}

        {!user && (
          <div className="authentification-wrapper">
            <Link className="signup" to="login">
              Connexion
            </Link>
            <Link to="signup">
              <input type="submit" value="INSCRIPTION" />
            </Link>
          </div>
        )}
      </header>
      {modalBurger && <Modalburger setModalBurger={setModalBurger} />}
    </>
  );
};

export default Header;
