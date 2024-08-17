import { useEffect } from "react";
import Article from "../article/Article";
import Main from "../main/Main";

function Homepage() {
  const marginFix = 20;

  useEffect(() => {
    document.title = "Asteria : Quizz, Space, Actus, Collections | Asteria";
  }, []);

  return (
    <>
      <Main />
      <Article marginFix={marginFix} />
    </>
  );
}

export default Homepage;
