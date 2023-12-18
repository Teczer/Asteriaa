import React from "react";
import ContactForm from "./ContactForm";
import "../contact/contactpage.scss";

export default function ContactPage() {
  return (
    <section className="contact-section">
      <h1>Contactez-nous</h1>
      <ContactForm />
    </section>
  );
}
