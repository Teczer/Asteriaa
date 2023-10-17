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
        <img
          className="actualCardView-image"
          src={actualCardView.cardBackImage}
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
    </ReactCardFlip>
  );
}
