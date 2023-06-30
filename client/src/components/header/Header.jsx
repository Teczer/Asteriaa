import { Link } from "react-router-dom";
import "./header.scss";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from "react";

const Header = () => {
  const [modalBurger, setModalBurger] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

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
            <span style={{ color: "var(--lavender-blush)" }}>{user.email}</span>
            <input type="submit" value="SE DÉCONNECTER" onClick={handleClick} />
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
