import { Link } from "react-router-dom";
import "./footer.scss";
import React from "react";

const footerSections = [
  {
    title: "Asteria",
    links: [
      { text: "Accueil", to: "/" },
      { text: "À propos", to: "/" },
      { text: "Qui est Asteria ?", to: "/" },
      { text: "Investir et Soutenir", to: "/" },
    ],
  },
  {
    title: "Catégories",
    links: [
      { text: "Espace", to: "/" },
      { text: "Galaxies", to: "/" },
      { text: "Phénomènes Observables", to: "/" },
      { text: "Astronautes", to: "/" },
    ],
  },
  {
    title: "Collection / Actualités",
    links: [
      { text: "Collection", to: "/" },
      { text: "Actualités", to: "/" },
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

function Footer() {
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
          <Link className="footer-link" to="/">
            © 2023 Asteria Inc.
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
