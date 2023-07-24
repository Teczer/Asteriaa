import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.scss";
import { useSignup } from "../../../hooks/useSignup";

function VerifyEmail() {
  const { getUserInfo } = useSignup();
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

        // Vérifier l'état isEmailVerified dans la base de données
        const userInfo = await getUserInfo(response.data.userId);
        console.log("userInfo", userInfo);
        if (userInfo && userInfo.isEmailVerified) {
          console.log("ilestvérifié");
          // L'e-mail est vérifié, effectuer la redirection vers la page d'accueil après 3 secondes
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        setSucess(false);
        setMessage("Une erreur est survenue lors de la vérification d'e-mail");
        setLoading(false); // Met fin au chargement même en cas d'erreur
      }
    };

    verifyEmail();
  }, [token, navigate]);

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
