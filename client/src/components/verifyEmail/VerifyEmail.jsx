import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.scss";
import { useAuthContext } from "../../../hooks/useAuthContext";
import getUserIdFromToken from "./getUserIdFromToken";

function VerifyEmail() {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  console.log("token", token);
  console.log("type", type);
  const [message, setMessage] = useState(null);
  const [sucess, setSucess] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, updateUser } = useAuthContext();
  console.log("user", user);

  const sendVerificationEmail = async (email, userId) => {
    try {
      const response = await axios.post(
        "http://146.59.150.192:5001/user/send-verification-email",
        { email, userId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false); // Met fin au chargement même en cas d'erreur
      console.log("response", response);
      setMessage(response.data.message);
      setSucess(true);
    } catch (error) {
      console.log("error post");
      console.error(
        "Erreur lors de l'envoi de l'e-mail de vérification : ",
        error
      );
      setSucess(false);
      setMessage(
        "Une erreur est survenue lors de l'envoi d'email de vérification"
      );
    }
  };

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await axios.get(
            `http://146.59.150.192:5001/user/verify/verify-email?token=${token}`
          );
          setLoading(false);
          setSucess(true);
          setMessage(response.data.message);

          // Récupérer le userId depuis le token
          const userId = getUserIdFromToken(token);
          console.log("userIdFROMVERIFY", userId);
          if (userId) {
            // Effectuer la requête pour récupérer les nouvelles données utilisateur
            const afterpatch = await axios.get(
              `http://146.59.150.192:5001/user/${userId}`
            );
            const updatedUserData = afterpatch.data;

            // Mettre à jour le contexte avec les nouvelles données utilisateur
            updateUser(updatedUserData);
          }

          // L'e-mail est vérifié, effectuer la redirection vers la page d'accueil après 3 secondes
          console.log("ilestvérifié");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (error) {
          console.log("on rentre dans le catch");
          setSucess(false);
          setMessage(
            "Une erreur est survenue lors de la vérification d'e-mail"
          );
          setLoading(false); // Met fin au chargement même en cas d'erreur
        }
      };

      verifyEmail();
    }
  }, [token, navigate, updateUser, user?._id]);

  return (
    <div className="verify-email-container">
      {token && !type ? (
        <>
          <h2 className="verify-email-title">Vérification d'e-mail</h2>
          {loading ? (
            <p className="verify-email-title">Chargement...</p>
          ) : (
            <>
              {sucess ? (
                <i className="fas fa-check-circle --sucess" />
              ) : (
                <i className="fa-solid fa-circle-xmark --error" />
              )}

              <h3 className={`verify-email --${sucess ? "success" : "error"}`}>
                {message || "Erreur : Impossible de vérifier l'e-mail"}
              </h3>
            </>
          )}
        </>
      ) : null}

      {type && !token ? (
        <div className="verification-in-progress">
          <i className="fa fa-paper-plane" aria-hidden="true" />
          <h2 className="verify-email-title">Vérification d'e-mail</h2>
          <p className="verify-email-info">
            Presque terminé ! Nous avons envoyé un e-mail de vérification à{" "}
            <b>{user.email}</b> , Vous devez vérifier votre adresse e-mail pour
            vous connecter à <b>Asteria</b> avec celle-ci.
          </p>
          <button
            className="verify-email-resend-button"
            onClick={() => {
              sendVerificationEmail(user.email, user._id);
            }}
          >
            Renvoyer
          </button>
          <h3 className={`verify-email --${sucess ? "success" : "error"}`}>
            {message}
          </h3>
        </div>
      ) : null}
    </div>
  );
}

export default VerifyEmail;
