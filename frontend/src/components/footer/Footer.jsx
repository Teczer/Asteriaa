import { Link } from "react-router-dom";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./footer.scss";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Footer() {
  const form = useRef();
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
  console.log("useraaa", user);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fivz3u6",
        "template_f3uhroi",
        form.current,
        "pONDnjqrno0secEVs"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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

  return (
    <footer className="footer-asteria">
      <div className="footer-sections-container">
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <label htmlFor="from_name" className="contact-form-label">
            Nom
          </label>
          <input
            id="from_name"
            className="contact-form-input"
            type="text"
            name="from_name"
            placeholder="Nom"
          />
          <label htmlFor="from_email" className="contact-form-label">
            Email
          </label>
          <input
            id="from_email"
            className="contact-form-input"
            type="email"
            name="from_email"
            placeholder="email@gmail.com"
          />
          <label htmlFor="message" className="contact-form-label">
            Message
          </label>
          <textarea
            placeholder="Message"
            id="message"
            className="contact-form-textarea"
            name="message"
          />
          <div className="contact-form-submit-box">
            <input
              className="contact-form-submit"
              type="submit"
              value="Envoyer"
            />
          </div>
        </form>
        {/* FOOTER DESKTOP */}
        <div className="footer-section-links-container">
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
