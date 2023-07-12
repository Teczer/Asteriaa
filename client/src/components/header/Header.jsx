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
        {!modalBurger && (
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            width="40"
            height="40"
            viewBox="0 0 22 16"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            className="burger-svg"
            onClick={() => setModalBurger(true)}
          >
            <path
              d="M1.94631 16C0.871392 16 0 15.1286 0 14.0537C0 14.024 0.0240384 14 0.0536913 14L20.0537 14C21.1286 14 22 14.8714 22 15.9463C22 15.976 21.976 16 21.9463 16H1.94631Z"
              fill="#FFFFFF"
            ></path>
            <path
              d="M1.94631 9C0.871392 9 0 8.12861 0 7.05369C0 7.02404 0.0240384 7 0.0536913 7H20.0537C21.1286 7 22 7.87139 22 8.94631C22 8.97596 21.976 9 21.9463 9H1.94631Z"
              fill="#FFFFFF"
            ></path>
            <path
              d="M1.94631 2C0.871392 2 0 1.12861 0 0.0536913C0 0.0240384 0.0240384 0 0.0536913 0H20.0537C21.1286 0 22 0.871392 22 1.94631C22 1.97596 21.976 2 21.9463 2H1.94631Z"
              fill="#FFFFFF"
            ></path>
          </svg>
        )}
        <button className="menu-burger">
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
          <Link to="/">Accueil</Link>
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
