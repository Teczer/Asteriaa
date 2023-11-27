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
  const { user, updateUserContext } = useAuthContext();
  console.log("user", user);
  const [timerRedirection, setTimerRedirection] = useState(3);
  const userId = getUserIdFromToken(token);

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

          if (userId) {
            // Effectuer la requête pour récupérer les nouvelles données utilisateur
            const afterpatch = await axios.get(
              `http://146.59.150.192:5001/user/${userId}`
            );
            const updatedUserData = afterpatch.data;

            // Mettre à jour le contexte avec les nouvelles données utilisateur
            updateUserContext(updatedUserData);
          }

          localStorage.setItem("completedTutorial", true);

          // L'e-mail est vérifié, effectuer la redirection vers la page d'accueil après 3 secondes
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
  }, [token, navigate, updateUserContext]);

  useEffect(() => {
    // Vérifie si sucess = true pour éviter d'incrémenter même si la vérification n'a pas abouti
    if (sucess) {
      // Décrémentation de la valeur de timerRedirection toutes les secondes
      if (timerRedirection > 0) {
        setInterval(() => {
          setTimerRedirection(timerRedirection - 1);
        }, 1000);
      }
    }
  }, [sucess, timerRedirection]);

  // Fonction pour censurer l'adresse e-mail
  const censorEmail = (email) => {
    // Sépare l'adresse e-mail en deux parties : la partie avant "@" et la partie après "@"
    const [username, domain] = email.split("@");

    // Censure la partie du nom d'utilisateur sauf le premier et le dernier caractère
    const censoredUsername = `${username.charAt(0)}${"*".repeat(
      username.length - 2
    )}${username.charAt(username.length - 1)}`;

    // Reconstitue l'adresse e-mail censurée
    return `${censoredUsername}@${domain}`;
  };

  return (
    <div className="verify-email-container">
      {token && !type ? (
        <>
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
              {sucess && (
                <span className="verify-redirection-timer">
                  Redirection dans {timerRedirection} ...
                </span>
              )}
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
            <b>{censorEmail(user.email)}</b> , Vous devez vérifier votre adresse
            e-mail pour vous connecter à <b>Asteria</b> avec celle-ci.
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
