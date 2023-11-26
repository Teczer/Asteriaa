import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./quizzresult.scss";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import ActualCardViewFront from "../../collections/ActualCardViewFront";

function QuizzResult({ CorrectAns }) {
  const params = useParams();
  const { user, updateUser } = useAuthContext();
  const collections = useCollection();
  const [actualCardView, setActualCardView] = useState(null);

  const currentCollection = collections.find(
    (collection) => params.quizzType === collection.slug
  );
  async function saveProgression() {
    const response = await axios.patch(
      `http://146.59.150.192:5001/user/${user._id}`,
      { [params.quizzType]: Number(params.quizzProgression) + 1 }
    );

    try {
      const afterpatch = await axios.get(
        `http://146.59.150.192:5001/user/${user._id}`
      );

      updateUser(afterpatch.data);
      console.log("afterpatch", afterpatch);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardClick = (collection, cardIndex) => {
    const selectedCard = {
      collectionName: collection.collectionName,
      cardTitle: collection.cardTitle[cardIndex],
      cardNumber: collection.cardNumber[cardIndex],
      cardFrontImage: collection.cardFrontImage[cardIndex],
      cardBackImage: collection.cardBackImage[cardIndex],
      cardFunFactIcon1: collection.cardFunFactIcon1[cardIndex],
      cardFunFactIcon2: collection.cardFunFactIcon2[cardIndex],
      cardFunFactIcon3: collection.cardFunFactIcon3[cardIndex],
      cardFunFactName1: collection.cardFunFactName1[cardIndex],
      cardFunFactName2: collection.cardFunFactName2[cardIndex],
      cardFunFactName3: collection.cardFunFactName3[cardIndex],
      cardFunFact1: collection.cardFunFact1[cardIndex],
      cardFunFact2: collection.cardFunFact2[cardIndex],
      cardFunFact3: collection.cardFunFact3[cardIndex],
      cardDescription: collection.cardDescription[cardIndex],
    };
    console.log("selectedCard", selectedCard);
    setActualCardView(selectedCard);
  };

  useEffect(() => {
    console.log(user);
    saveProgression();
    localStorage.setItem(params.quizzType, Number(params.quizzProgression) + 1);
  }, []);

  const [testVisible, setTestVisible] = useState(false);

  useEffect(() => {
    // Lors du chargement de la page, déplacez la div test vers le milieu
    setTestVisible(true);
  }, []);

  console.log("currentCollection");

  console.log("a", [Number(params.quizzProgression)]);
  return (
    <>
      {actualCardView ? (
        <div
          className="actualCardView-layout"
          onClick={() => setActualCardView(null)}
        >
          <ActualCardViewFront actualCardView={actualCardView} />
        </div>
      ) : (
        <>
          <p style={{ color: "white" }}>
            Félicitations vous avez gagné la carte{" "}
            {currentCollection.cardTitle[Number(params.quizzProgression)]}
          </p>
          <article
            className="card"
            onClick={() =>
              handleCardClick(
                currentCollection,
                Number(params.quizzProgression)
              )
            }
          >
            <img
              src={
                currentCollection.cardFrontImage[
                  Number(params.quizzProgression)
                ]
              }
              alt="collection-img"
            />
          </article>
          <div className={`test ${testVisible ? "active" : ""}`}>
            <div className="modal-user-notconnected-buttons">
              <a
                className="modal-user-notconnected-inscription"
                href={`/quizzcontroller/${params.quizzType}/${
                  Number(params.quizzProgression) + 1
                }`}
              >
                Niveau suivant
              </a>
              <Link
                className="modal-user-notconnected-connexion --result"
                to="/"
              >
                Retourner à l'accueil
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuizzResult;
