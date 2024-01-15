import { useState } from "react";
import { loginUser } from "../services/UserService";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      console.log("data", data);
      const userData = { ...data, loginService: "asteria" };
      console.log("userData", userData);
      // save the user to localstorage
      localStorage.setItem("authToken", userData?.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // update the auth context
      dispatch({ type: "LOGIN", payload: userData });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { login, isLoading, error };
};
