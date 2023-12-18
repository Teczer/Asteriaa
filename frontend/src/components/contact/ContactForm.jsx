import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../contact/contactpage.scss";

export default function ContactForm() {
  const form = useRef();
  const [message, setMessage] = useState(null);
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
          setMessage("Votre mail a bien été envoyé !");
        },
        (error) => {
          console.log(error.text);
          setMessage(error.text);
        }
      );
  };
  return (
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
        <input className="contact-form-submit" type="submit" value="Envoyer" />
      </div>
      {message && (
        <p style={{ color: "var(--carnation-pink)", marginTop: "5Opx" }}>
          {message}
        </p>
      )}
    </form>
  );
}
