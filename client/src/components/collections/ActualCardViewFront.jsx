import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function ActualCardViewFront({ actualCardView }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Avant de la carte */}
      <div className="actualCardView-box" onClick={handleClick}>
        <img
          className="actualCardView-image"
          src={actualCardView.cardFrontImage}
          alt={actualCardView.cardTitle}
        />
        <p className="actualcardview-title">{actualCardView.cardTitle}</p>
        <div className="actualCardView-cardNumber">
          {actualCardView.cardNumber}
        </div>
        <p className="actualcardview-collection-label">Collection</p>
        <p className="actualcardview-collectionName">
          {actualCardView.collectionName}
        </p>
      </div>

      {/* Arrière de la carte */}
      <div className="actualCardView-box" onClick={handleClick}>
        <p className="actualcardview-title-back">{actualCardView.cardTitle}</p>
        <img
          className="actualCardView-back-image"
          src={actualCardView.cardBackImage}
          alt={actualCardView.cardTitle}
        />
        <div className="actualCardView-facticon-box">
          <div className="actualCardView-funfact-wrapper">
            <div className="actualCardView-funfact-box">
              <p>{actualCardView.cardFunFactIcon1}</p>
              <p>{actualCardView.cardFunFactName1}</p>
              <p>{actualCardView.cardFunFact1}</p>
            </div>
            <div className="actualCardView-funfact-box">
              <p>{actualCardView.cardFunFactIcon2}</p>
              <p>{actualCardView.cardFunFactName2}</p>
              <p>{actualCardView.cardFunFact2}</p>
            </div>
            <div className="actualCardView-funfact-box">
              <p>{actualCardView.cardFunFactIcon3}</p>
              <p>{actualCardView.cardFunFactName3}</p>
              <p>{actualCardView.cardFunFact3}</p>
            </div>
          </div>
        </div>
        <div className="actualCardView-description">
          <p className="actualCardView-description-paragraph">
            {actualCardView.cardDescription}
          </p>
        </div>
      </div>
    </ReactCardFlip>
  );
}
