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
  const [sucess, setSucess] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour effectuer l'appel à l'API
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://146.59.150.192:5001/user/verify/verify-email?token=${token}`
        );
        setSucess(true);
        setMessage(response.data.message); // Stocke le message de vérification dans l'état du composant
        setLoading(false); // Met fin au chargement une fois la réponse reçue
      } catch (error) {
        setSucess(false);
        setMessage("Une erreur est survenue lors de la vérification d'e-mail");
        setLoading(false); // Met fin au chargement même en cas d'erreur
      }
    };

    verifyEmail();
  }, [token]);

  // Vérifier si l'e-mail a déjà été vérifié avec succès
  const isEmailVerified = localStorage.getItem("isEmailVerified") === "true";

  // Rediriger vers la page d'accueil si l'e-mail est vérifié avec succès
  useEffect(() => {
    if (isEmailVerified) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isEmailVerified, navigate]);

  // Mettre à jour le localStorage lorsque l'e-mail est vérifié avec succès
  useEffect(() => {
    if (sucess) {
      localStorage.setItem("isEmailVerified", "true");
    }
  }, [sucess]);

  return (
    <div className="verify-email-container">
      <h2 className="verify-email-title">Vérification d'e-mail</h2>
      {loading ? (
        <p className="verify-email-title">Chargement...</p>
      ) : (
        <>
          {sucess ? (
            <i class="fas fa-check-circle --sucess" />
          ) : (
            <i class="fa-solid fa-circle-xmark --error" />
          )}

          <h3 className={`verify-email --${sucess ? "success" : "error"}`}>
            {message || "Erreur : Impossible de vérifier l'e-mail"}
          </h3>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
