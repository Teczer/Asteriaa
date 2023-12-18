import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./footer.scss";

function Footer() {
  const { user } = useAuthContext();
  // IF USER IS NOT CONNECTED
  const progressionSystemeSolaireLocal = localStorage.getItem(
    "quizzSystemeSolaire"
  );
  const progressionGalaxiesLocal = localStorage.getItem("quizzGalaxies");
  const progressionPhenomenesObservablesLocal = localStorage.getItem(
    "quizzPhenomenesObservables"
  );
  const progressionAstronautesLocal = localStorage.getItem("quizzAstronautes");

  const footerSections = [
    {
      title: "Navigation",
      links: [
        { text: "Accueil", to: "/" },
        { text: "Collection", to: "/collection" },
        { text: "Actualités", to: "/news" },
      ],
    },

    {
      title: "Catégories",
      links: [
        {
          text: "Systeme Solaire",
          to: `/quizzcontroller/quizzSystemeSolaire/${
            user ? user.quizzSystemeSolaire : progressionSystemeSolaireLocal
          }`,
        },
        {
          text: "Galaxies",
          to: `/quizzcontroller/quizzGalaxies/${
            user ? user.quizzGalaxies : progressionGalaxiesLocal
          }`,
        },
        {
          text: "Phénomènes Observables",
          to: `/quizzcontroller/quizzPhenomenesObservables/${
            user
              ? user.quizzPhenomenesObservables
              : progressionPhenomenesObservablesLocal
          }`,
        },
        {
          text: "Astronautes",
          to: `/quizzcontroller/quizzAstronautes/${
            user ? user.quizzAstronautes : progressionAstronautesLocal
          }`,
        },
      ],
    },
    {
      title: "Asteria",
      links: [
        { text: "À propos", to: "/" },
        { text: "Qui est Asteria ?", to: "/" },
      ],
    },
    {
      title: "Légal",
      links: [
        { text: "Politique de confidentialité", to: "/" },
        { text: "Crédits", to: "/" },
      ],
    },
  ];

  const footerMobileSection = [
    {
      text: "Collection de cartes",
      to: "/collection",
    },
    {
      text: "Contactez-nous",
      to: "/contact",
    },
    {
      text: "Accueil",
      to: "/",
    },
    {
      text: "Les dernières actualités !",
      to: "/news",
    },
    {
      text: "Quizz",
      to: "/quizz",
    },
  ];

  return (
    <footer className="footer-asteria">
      <div className="footer-sections-container">
        {/* FOOTER MOBILE */}
        <section className="footer-section --mobile">
          <ul className="footer-link-container --mobile">
            {footerMobileSection.map((title, index) => (
              <li className="footer-link-item --mobile" key={index}>
                <Link className="footer-h3 --mobile" to={title.to}>
                  {title.text}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {/* FOOTER DESKTOP */}
        {footerSections.map((section, index) => (
          <section key={index} className="footer-section">
            <h3 className="footer-h3">{section.title}</h3>
            <ul className="footer-link-container">
              {section.links.map((link, index) => (
                <li key={index} className="footer-link-item">
                  <Link className="footer-link" to={link.to}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="social-medials --mobile">
        <div className="footer-copyright">
          <span className="footer-link">© 2023 Asteria Inc.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
