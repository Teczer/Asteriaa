import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import ActualCardViewFront from "../../collections/ActualCardViewFront";
import { updateUser } from "../../../../services/UserService";
import Stepper from "../stepper/Stepper";
import "./quizzresult.scss";
import "../../collections/collection.scss";

function QuizzResult({ CorrectAns, showResult }) {
  const params = useParams();
  const { user, updateUserContext } = useAuthContext();
  const collections = useCollection();
  const [actualCardView, setActualCardView] = useState(null);

  console.log("params", params);

  const currentCollection = collections.find(
    (collection) => params.quizzType === collection.slug
  );

  async function saveProgression() {
    try {
      // Utilisez la fonction updateUser pour mettre à jour l'utilisateur
      const updatedUser = await updateUser(user._id, {
        [params.quizzType]: Number(params.quizzProgression) + 1,
      });

      // Mettez à jour le contexte avec les nouvelles données utilisateur
      updateUserContext(updatedUser);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la progression du quizz : ",
        error
      );
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
    setActualCardView(selectedCard);
  };

  useEffect(() => {
    saveProgression();
    localStorage.setItem(params.quizzType, Number(params.quizzProgression) + 1);
  }, []);

  const [testVisible, setTestVisible] = useState(false);

  useEffect(() => {
    // Lors du chargement de la page, déplacez la div test vers le milieu
    if (!showResult) return;
    const timeout = setTimeout(() => {
      setTestVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [showResult]);

  return (
    <>
      {/* QUIZZ CONTROLLER SECTION */}
      <div
        style={{ width: "100%", overflow: "visible" }}
        className={`swipe --left ${testVisible ? "active" : ""}`}
      >
        <div className="stepper-leave-container">
          <Stepper currentQuestion1={3} />
        </div>
      </div>
      {actualCardView ? (
        <div
          className="actualCardView-layout"
          onClick={() => setActualCardView(null)}
        >
          <ActualCardViewFront actualCardView={actualCardView} />
        </div>
      ) : (
        <>
          <div className="correct-ans-box">
            <div>
              <div
                className={`swipe --left ${testVisible ? "active --1sec" : ""}`}
              >
                <p className="good-job-cyril">Bien joué !</p>
              </div>
              <div
                className={`swipe --left ${
                  testVisible ? "active --1-5sec" : ""
                }`}
              >
                <p>Tu remportes une carte</p>
              </div>
            </div>
            <div>
              <div className={`swipe --right ${testVisible ? "active" : ""}`}>
                <span className="correct-ans-number">{CorrectAns}</span> sur 3
              </div>
            </div>
          </div>
          <div
            className={`swipe --right ${testVisible ? "active --2sec" : ""}`}
          >
            <article
              className="card-ending-view"
              onClick={() =>
                handleCardClick(
                  currentCollection,
                  Number(params.quizzProgression)
                )
              }
            >
              <p className="collection-title">
                {currentCollection.cardTitle[Number(params.quizzProgression)]}
              </p>
              <img
                className="collection-card-img-ending"
                src={
                  currentCollection.cardFrontImage[
                    Number(params.quizzProgression)
                  ]
                }
                alt="collection-img"
              />
            </article>
          </div>
          <div className={`swipe --left ${testVisible ? "active --3sec" : ""}`}>
            <div className="ending-view-buttons-wrapper">
              {params.quizzProgression < "4" && (
                <a
                  className="ending-view-nextquizz-button"
                  href={`/quizzcontroller/${params.quizzType}/${
                    Number(params.quizzProgression) + 1
                  }`}
                >
                  Niveau suivant
                </a>
              )}

              <Link className="ending-view-backhome-button" to="/">
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
