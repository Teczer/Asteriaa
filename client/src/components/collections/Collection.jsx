import { useState } from "react";
import "./collection.scss";
import ActualCardViewFront from "./ActualCardViewFront";
import { useCollection } from "../../../hooks/useCollection";

export default function Collection() {
  const collections = useCollection();

  const [actualCardView, setActualCardView] = useState(null);

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

  console.log("actualCardView", actualCardView);
  return (
    <main className="main-content">
      <div className="category-title-cards-container">
        {actualCardView ? (
          <div
            className="actualCardView-layout"
            onClick={() => setActualCardView(null)}
          >
            <ActualCardViewFront actualCardView={actualCardView} />
          </div>
        ) : (
          collections.map((collection, index) => (
            <div key={index} className="collection-card">
              <h3 className="title-category-collection">
                {collection.collectionName}
              </h3>
              <div className="cards-wrapper">
                {collection.cardTitle
                  .slice(0, collection.collectionLevel)
                  .map((title, cardIndex) => (
                    <article
                      key={cardIndex}
                      className="card"
                      onClick={() => handleCardClick(collection, cardIndex)}
                    >
                      <img
                        src={collection.cardFrontImage[cardIndex]}
                        alt={title}
                        style={{ borderRadius: 20 }}
                      />
                    </article>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
