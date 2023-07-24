import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const sendVerificationEmail = async (email, userId) => {
    try {
      await axios.post(
        "http://146.59.150.192:5001/user/send-verification-email",
        { email, userId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de vérification : ",
        error
      );
    }
  };

  const signup = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "http://146.59.150.192:5001/user/signup",
        JSON.stringify({
          email,
          password,
          isAdmin: false,
          userName,
          profilePicture:
            "https://cdn.dribbble.com/users/1438762/screenshots/11159465/media/47bff5efea8682a4a28d8f10675225de.jpg?compress=1&resize=400x300&vertical=center",
          quizzSystemeSolaire: 1,
          quizzGalaxies: 1,
          quizzPhenomenesObservables: 1,
          quizzAstronautes: 1,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // save the user to localstorage
      localStorage.setItem("user", JSON.stringify(data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      localStorage.setItem("isVerifiedAccount", false);
      // Envoi de l'e-mail de vérification
      sendVerificationEmail(email, data._id);
    } catch (error) {
      const { response } = error;
      console.log(error);
      setIsLoading(false);
      setError(response.data.error);
    }
  };

  const getUserInfo = async (userId) => {
    try {
      console.log("userIdFromgetuserInfo", userId);
      const { data } = await axios.get(
        `http://146.59.150.192:5001/user/${userId}`
      );
      return data; // Renvoie les informations de l'utilisateur
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur : ",
        error
      );
      return null;
    }
  };

  return { signup, isLoading, error, sendVerificationEmail, getUserInfo };
};
