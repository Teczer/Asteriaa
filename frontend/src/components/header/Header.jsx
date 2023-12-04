import { Link } from "react-router-dom";
import "./header.scss";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import Usermodal from "./modal/Usermodal";
import Modalburger from "./modal/Modalburger";
import ChangePictureModal from "./modal/ChangePictureModal";

const Header = ({ isAdmin, location }) => {
  const [modalBurger, setModalBurger] = useState(false);
  const [modalAuthentification, setModalAuthentification] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [isChangingProfilePicture, setIsChangingProfilePicture] =
    useState(false);

  const { user } = useAuthContext();

  return (
    <>
      <header
        className={`header-asteria ${user ? "--userconnected" : ""} ${
          isAdmin ? "--isAdmin" : ""
        }`}
      >
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
            onClick={() => {
              setModalAuthentification(false);
              setModalBurger(true);
            }}
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
        {modalBurger && (
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 22 16"
            xmlns="http://www.w3.org/2000/svg"
            class=""
            version="1.1"
            className="burger-svg"
            fill="#FFFFFF"
            width="40"
            height="40"
            onClick={() => setModalBurger(false)}
          >
            <path
              d="M17.6,1.5L17,0.9c-0.4-0.4-1-0.4-1.3,0L9,7.5L1.9,0.4c-0.1-0.1-0.2-0.1-0.3,0L0.9,1c-0.4,0.4-0.4,1,0,1.3L7.5,9l-7.1,7.1
          c-0.1,0.1-0.1,0.2,0,0.3L1,17c0.4,0.4,1,0.4,1.3,0L9,10.4l7.1,7.1c0.1,0.1,0.2,0.1,0.3,0l0.6-0.6c0.4-0.4,0.4-1,0-1.3L10.5,9
          l7.1-7.1C17.7,1.8,17.7,1.6,17.6,1.5z"
              fill="#FFFFFF"
            ></path>
          </svg>
        )}
        <a
          className={`logo-container ${user ? "--userconnected" : ""}`}
          href="/"
        >
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
          <Link className="link-nav-wrapper" to="/">
            Accueil
          </Link>
          <Link className="link-nav-wrapper" to="quizz">
            Quizz
          </Link>
          <Link className="link-nav-wrapper" to="news">
            Actualités
          </Link>
          <Link className="link-nav-wrapper" to="collection">
            Collection
          </Link>
        </div>
        {user && (
          <>
            <figure
              className="figure-user-profile-picture"
              onClick={() => setUserModal(true)}
              style={{ visibility: modalBurger ? "hidden" : "visible" }}
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
          </>
        )}

        {!user && (
          <div className="authentification-wrapper">
            <Link
              className="modal-user-notconnected-connexion --desktop"
              to="login"
            >
              Connexion
            </Link>
            <Link
              className="modal-user-notconnected-inscription --desktop"
              to="signup"
            >
              Inscription
            </Link>
          </div>
        )}

        {!user && (
          <>
            {modalAuthentification ? (
              <button className="menu-burger">
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => setModalAuthentification(false)}
                />
              </button>
            ) : (
              <svg
                role="img"
                aria-hidden="true"
                width="40"
                height="40"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`burger-svg ${modalBurger ? "--hidden" : ""}`}
                onClick={() => setModalAuthentification(true)}
              >
                <path
                  d="M6.10527 13.2415C6.62693 13.7184 7.2185 14.1202 7.86282 14.4297C7.83316 14.4351 7.80351 14.4406 7.77386 14.4461L6.83118 14.8182C4.77735 15.923 3.27451 18.0633 2.34357 21.3578C2.30639 21.4894 2.38291 21.6262 2.51449 21.6634C2.5364 21.6696 2.55905 21.6727 2.58181 21.6727L19.4199 21.6727C19.5566 21.6727 19.6674 21.5618 19.6674 21.4251C19.6674 21.4023 19.6643 21.3797 19.6581 21.3578C18.7274 18.0642 17.2252 15.9243 15.1723 14.8192L14.191 14.4348C14.1759 14.432 14.1607 14.4292 14.1456 14.4265C14.7873 14.1174 15.3766 13.7168 15.8964 13.2415C18.4531 14.5762 20.2629 17.1246 21.3259 20.8865C21.3755 21.0617 21.4006 21.243 21.4006 21.4251C21.4006 22.519 20.5138 23.4058 19.4199 23.4058L2.58181 23.4058C2.3997 23.4058 2.21845 23.3807 2.0432 23.3312C0.990498 23.0337 0.378263 21.9392 0.675732 20.8865C1.73875 17.1246 3.5486 14.5762 6.10527 13.2415V13.2415Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M18.2582 7.88763C18.2582 11.8956 15.0091 15.1446 11.0012 15.1446C6.99321 15.1446 3.74414 11.8956 3.74414 7.88763C3.74414 3.87969 6.99321 0.630615 11.0012 0.630615C15.0091 0.630615 18.2582 3.87969 18.2582 7.88763ZM5.47734 7.88508C5.47734 10.9358 7.95046 13.4089 11.0012 13.4089C14.052 13.4089 16.5251 10.9358 16.5251 7.88508C16.5251 4.83433 14.052 2.36121 11.0012 2.36121C7.95046 2.36121 5.47734 4.83433 5.47734 7.88508Z"
                  fill="#FFFFFF"
                ></path>
              </svg>
            )}
          </>
        )}
      </header>
      {modalAuthentification && (
        <div className="modal-container --user animated">
          <div className="modal-container --layoutuser animated">
            <div className="modal-user-notconnected-infos">
              <p className="modal-user-notconnected-title">
                Bienvenue chez Asteria
              </p>
              <p className="modal-user-notconnected-info">
                Connectez-vous ou inscrivez-vous pour profiter pleinement de
                l'expérience Asteria !
              </p>
            </div>
            <div className="modal-user-notconnected-buttons">
              <Link to="signup" className="modal-user-notconnected-inscription">
                Inscription
              </Link>
              <Link to="login" className="modal-user-notconnected-connexion">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      )}

      {modalBurger && <Modalburger setModalBurger={setModalBurger} />}
    </>
  );
};

export default Header;
