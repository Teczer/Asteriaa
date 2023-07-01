import React, { useState } from "react";
import "./questioncard.scss";

function QuestionCard({
  post,
  currentQuestionNumber,
  setCorrectAns,
  setIsFlipping,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  const [buttonsEnabled, setButtonsEnabled] = useState(true);

  const handleButtonClick = () => {
    // Désactiver les boutons
    setButtonsEnabled(false);

    // Attendre 2 secondes avant de réactiver les boutons
    setTimeout(() => {
      setButtonsEnabled(true);
    }, 2000); // Laps de temps en millisecondes (ici, 2 secondes)
  };

  return (
    <div className="question-container">
      <h3 className="question-number">QUESTION {currentQuestionNumber}</h3>
      <div className="image-demerde" style={{ width: "100%" }}>
        <img
          className="question-picture"
          src={post.photoQuestion}
          alt="questionImage"
        />
      </div>
      <p className="question-questionvalue">{post.questionValue}</p>
      <div className="button-anwser-container">
        {post.questionOptions.map((question, index) => {
          const isCorrect = question.isCorrect === 1;
          const isSelected = selectedOption === index;
          const buttonClassName = `button-quizz ${
            isSelected ? (isCorrect ? "correct" : "incorrect") : ""
          }`;

          return (
            <button
              className={buttonClassName}
              tabIndex={(1, 2, 3, 4)}
              onClick={() => {
                handleButtonClick();
                handleOptionClick(index);
                if (isCorrect) {
                  setCorrectAns((prevCorrectAns) => prevCorrectAns + 1);
                }
                setIsFlipping(true);
              }}
              key={index}
              disabled={!buttonsEnabled}
            >
              {question.questionAnswer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
