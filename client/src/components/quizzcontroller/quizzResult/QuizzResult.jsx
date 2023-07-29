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
    <>
      <h1 className="total-correct-ans-quizz">{CorrectAns} / 3</h1>
      {/* <article>
        <img
          src="https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg"
          alt="nebuleuse-end"
        />
      </article> */}
      <h2 className="building-content-alert">
        &#9888; COLLECTION CARD EN PHASE DE CONSTRUCTION &#9888;
      </h2>
      <div className="modal-user-notconnected-buttons">
        <a
          className="modal-user-notconnected-inscription"
          href={`/quizzcontroller/${params.quizzType}/${
            Number(params.quizzProgression) + 1
          }`}
        >
          Niveau suivant
        </a>
        <Link className="modal-user-notconnected-connexion --result" to="/">
          Retourner à l'accueil
        </Link>
      </div>
    </>
  );
}

export default QuizzResult;
