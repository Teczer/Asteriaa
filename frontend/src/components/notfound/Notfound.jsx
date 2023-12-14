import { Link } from "react-router-dom";
import AsteriaHeaderLogo from "../../assets/AsteriaHeaderLogo.svg";
import "./notfound.scss";

function Notfound() {
  return (
    <>
      <section className="notfound-section">
        <div className="notfound-wrapper">
          <p>4</p>
          <img
            className="notfound-img"
            src={AsteriaHeaderLogo}
            alt="logo-asteria"
          />
          <p>4</p>
        </div>
        <h2>
          Vous vous rapprochez d'un trou noir, veuillez faire demi-tour le plus
          rapidement possible !
        </h2>
        <Link to="/" className="backhome-notfound">
          Retourner à l'accueil
        </Link>
      </section>
    </>
  );
}

export default Notfound;
