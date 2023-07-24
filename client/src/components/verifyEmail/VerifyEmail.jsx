import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.scss";

function VerifyEmail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log("token", token);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour effectuer l'appel à l'API
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://146.59.150.192:5001/user/verify-email?token=${token}`
        );
        setMessage(response.data.message); // Stocke le message de vérification dans l'état du composant
        setLoading(false); // Met fin au chargement une fois la réponse reçue
      } catch (error) {
        setMessage("Une erreur est survenue lors de la vérification d'e-mail");
        setLoading(false); // Met fin au chargement même en cas d'erreur
      }
    };

    verifyEmail();
  }, [token]);

  // Redirige l'utilisateur vers la page d'accueil une fois l'e-mail vérifié
  useEffect(() => {
    if (!loading && message === "E-mail vérifié avec succès !") {
      setTimeout(() => {
        navigate("/"); // Redirige vers la page d'accueil après 3 secondes
      }, 3000);
    }
  }, [loading, message, navigate]);

  return (
    <div className="verify-email-container">
      <h2 className="verify-email-title">Vérification d'e-mail</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <p className={!message ? "verify-email-success" : "verify-email-error"}>
          {message || "Erreur : Impossible de vérifier l'e-mail"}
        </p>
      )}
    </div>
  );
}

export default VerifyEmail;
