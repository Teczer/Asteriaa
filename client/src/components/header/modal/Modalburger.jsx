import { Link } from "react-router-dom";

function Modalburger({ setModalBurger }) {
  return (
    <div className="modal-container animated">
      <nav className="nav-modal-container">
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
  );
}

export default Modalburger;
