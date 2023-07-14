import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./quizzresult.scss";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function QuizzResult({ CorrectAns }) {
  const params = useParams();
  const { user } = useAuthContext();

  async function saveProgression() {
    const response = await axios.patch(
      `http://146.59.150.192:5001/user/${user._id}`,
      { [params.quizzType]: Number(params.quizzProgression) + 1 }
    );

    const afterpatch = axios.get(`http://146.59.150.192:5001/user/${user._id}`);

    console.log(afterpatch);

    console.log("user", user);
    console.log("response.data", response.data);
  }

  useEffect(() => {
    console.log(user);
    saveProgression();
    localStorage.setItem(params.quizzType, Number(params.quizzProgression) + 1);
  }, []);
  return (
    <div className="quizzresult-container">
      <div className="total-result-wrapper">
        <h1>{CorrectAns} / 3</h1>
        <h2>bonnes réponses</h2>
      </div>
      <div className="btn-containerr">
        <Link className="button-to-home" to="/">
          Retourner à l'accueil
        </Link>
        <a
          className="button-to-home"
          href={`/quizzcontroller/${params.quizzType}/${
            Number(params.quizzProgression) + 1
          }`}
        >
          Niveau suivant
        </a>
      </div>
    </div>
  );
}

export default QuizzResult;
