import React from "react";
import Article from "../article/Article";
import Main from "../main/Main";

function Homepage() {
  const marginFix = 20;
  return (
    <>
      <Main />
      <Article marginFix={marginFix} />
    </>
  );
}

export default Homepage;
