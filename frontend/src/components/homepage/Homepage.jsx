import { useEffect } from "react";
import Article from "../article/Article";
import Main from "../main/Main";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Homepage() {
  const marginFix = 20;

  useEffect(() => {
    document.title = "Asteria : Quizz, Space, Actus, Collections | Asteria";
  }, []);

  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (user?.loginService === "asteria") return;

    const getUser = async () => {
      try {
        const response = await axios.get("/auth/profile", {
          withCredentials: true,
        });

        console.log("response", response?.data);
        if (!response.data) return;
        const userData = { ...response.data.user, loginService: "google" };
        // save the user to localstorage
        localStorage.setItem("user", JSON.stringify(userData));

        // update the auth context
        dispatch({ type: "LOGIN", payload: userData });
      } catch (error) {
        console.log("error", error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Main />
      <Article marginFix={marginFix} />
    </>
  );
}

export default Homepage;
