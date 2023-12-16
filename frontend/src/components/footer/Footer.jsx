import { Link } from "react-router-dom";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./footer.scss";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Footer() {
  const form = useRef();
  const { user } = useAuthContext();
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
      title: "Asteria",
      links: [
        { text: "Accueil", to: "/" },
        { text: "À propos", to: "/" },
        { text: "Qui est Asteria ?", to: "/" },
      ],
    },
    {
      title: "Catégories",
      links: [
        {
          text: "Systeme Solaire",
          to: `/quizzcontroller/quizzSystemeSolaire/${user.quizzSystemeSolaire}`,
        },
        {
          text: "Galaxies",
          to: `/quizzcontroller/quizzGalaxies/${user.quizzGalaxies}`,
        },
        {
          text: "Phénomènes Observables",
          to: `/quizzcontroller/quizzPhenomenesObservables/${user.quizzPhenomenesObservables}`,
        },
        {
          text: "Astronautes",
          to: `/quizzcontroller/quizzAstronautes/${user.quizzAstronautes}`,
        },
      ],
    },
    {
      title: "Collection / Actualités",
      links: [
        { text: "Collection", to: "/collection" },
        { text: "Actualités", to: "/news" },
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
      text: "Politique de confidentialité",
      to: "/",
    },
    {
      text: "Catégories",
      to: "/",
    },
    {
      text: "À propos",
      to: "/",
    },
    {
      text: "Investir et Soutenir",
      to: "/",
    },
    {
      text: "Crédits",
      to: "/",
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
