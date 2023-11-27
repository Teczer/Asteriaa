import { useState } from "react";
import { signupUser, sendVerificationEmail } from "../services/UserService";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await signupUser(email, password, userName);
      // save the user to localstorage
      localStorage.setItem("user", JSON.stringify(data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      localStorage.setItem("isVerifiedAccount", false);
      // Envoi de l'e-mail de vérification
      await sendVerificationEmail(email, data._id);
      navigate("/verify?type=verifying");
    } catch (error) {
      const { response } = error;
      console.log(error);
      setIsLoading(false);
      setError(response.data.error);
    }
  };

  return { signup, isLoading, error };
};
