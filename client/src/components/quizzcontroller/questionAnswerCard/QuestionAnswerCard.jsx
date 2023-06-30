import { useState } from "react";
import "./questionanswercard.scss";

function QuestionAnswerCard({ post, handleNextQuestion }) {
  // Trouver la réponse correcte
  const correctAnswer = post.questionOptions.find(
    (option) => option.isCorrect === 1
  );

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

  return (
    <div className="question-answer-container">
      <h3 className="question-response">RÉPONSE</h3>
      <img src={post.photoAnswer} alt="photoAnswer" />
      <h4>{correctAnswer && correctAnswer.questionAnswer}</h4>
      <p>{post.answerExplanation}</p>
      <button
        className="button-next-question"
        tabIndex={1}
        onClick={() => {
          handleNextQuestion();
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
