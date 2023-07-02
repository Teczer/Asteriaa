import { Link } from "react-router-dom";
import "./header.scss";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const [modalBurger, setModalBurger] = useState(false);
  const [userModal, setUserModal] = useState(false);

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
              <div className="user-controller-modal">
                <div className="user-controller-wrapper">
                  <button
                    className="close-user-modal-btn"
                    onClick={() => setUserModal(false)}
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                  <div className="user-information-wrapper">
                    <figure className="figure-user-profile-picture --modal">
                      <img
                        className="user-profile-picture"
                        src={user.profilePicture}
                        alt="user-profil-picture"
                      />
                      <div className="btn-change-container">
                        <button className="change-picture-btn">
                          <i class="fa-solid fa-camera"></i>
                        </button>
                      </div>
                    </figure>
                    <div className="username-usermail-wrapper">
                      <p className="username-modal">Teczer</p>
                      <span className="usermail-modal">{user.email}</span>
                    </div>
                  </div>
                  <Link className="to-user-page" to="/">
                    Gérer votre compte Asteria
                  </Link>
                </div>
                <input
                  type="submit"
                  value="SE DÉCONNECTER"
                  onClick={handleClick}
                />
              </div>
            )}
          </div>
        )}

        {!user && (
          <div className="authentification-wrapper">
            <Link className="signup" to="login">
              Connexion
            </Link>
            <Link className="login" to="signup">
              Inscription
            </Link>
          </div>
        )}
      </header>
      {modalBurger && (
        <div className="modal-container animated">
          <nav className="nav-modal-container">
            <p>Navigation</p>
            <ul className="ul-modal-container">
              <li className="li-modal-container">
                <Link
                  to="/"
                  className="modal-link"
                  onClick={() => setModalBurger(false)}
                >
                  <span>Accueil</span>
                </Link>
              </li>
              <li className="li-modal-container">
                <Link
                  to="quizz"
                  className="modal-link"
                  onClick={() => setModalBurger(false)}
                >
                  <span>Quizz</span>
                </Link>
              </li>
              <li className="li-modal-container">
                <Link
                  to="news"
                  className="modal-link"
                  onClick={() => setModalBurger(false)}
                >
                  <span>Actualités</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
