import { useState } from "react";
import "./questionanswercard.scss";
import classNames from "classnames";

function QuestionAnswerCard({ post, handleNextQuestion }) {
  // Trouver la réponse correcte
  const correctAnswer = post.questionOptions.find(
    (option) => option.isCorrect === true
  );

  console.log("correctAnswer", correctAnswer);
  console.log("post", post);
  // ANTI ABUSE BUTTON

  const [buttonEnabled, setButtonEnabled] = useState(true);

  const cancelButtonAbuse = () => {
    // Désactiver le bouton "Continuer"
    setButtonEnabled(false);

    // Attendre 2 secondes avant de réactiver le bouton
    setTimeout(() => {
      setButtonEnabled(true);
    }, 2000); // Laps de temps en millisecondes (ici, 2 secondes)
  };

  const [answerCardDisappear, setAnswerCardDisappear] = useState(false);

  return (
    <div
      className={classNames(
        "question-answer-container",
        answerCardDisappear && "disappear-animation"
      )}
    >
      <div className="answer-content-wrapper">
        <div style={{ width: "100%" }}>
          <h3 className="question-response">RÉPONSE</h3>
          <div className="image-demerde" style={{ width: "100%" }}>
            <img
              className="question-picture"
              src={post.photoAnswer}
              alt="photoAnswer"
            />
          </div>
        </div>
        <h4 className="question-correctanswer">
          {correctAnswer && correctAnswer.questionAnswer}
        </h4>
        <p className="answer-explanation">{post.answerExplanation}</p>
      </div>
      <button
        className="button-next-question"
        tabIndex={1}
        onClick={() => {
          setAnswerCardDisappear(true);
          setTimeout(() => {
            handleNextQuestion();
            setAnswerCardDisappear(false);
          }, 500);
          cancelButtonAbuse();
        }}
        disabled={!buttonEnabled}
      >
        Continuer
      </button>
    </div>
  );
}

export default QuestionAnswerCard;
