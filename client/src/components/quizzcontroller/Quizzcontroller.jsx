import "./quizzcontroller.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./questionCard/QuestionCard";
import QuestionAnswerCard from "./questionAnswerCard/QuestionAnswerCard";
import QuizzResult from "./quizzResult/QuizzResult";
import { useParams } from "react-router-dom";

function Quizzcontroller() {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);
  const params = useParams();

  async function getSqlQuizz(params) {
    try {
      const response = await axios.post("http://localhost:3010/quizz", {
        quizzType: params.quizzType,
        quizzProgression: params.quizzProgression,
      });

      console.log("Axios SQL Response", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSqlQuizz(params);
  }, []);

  const [CorrectAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestion1, setCurrentQuestion2] = useState(1);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < posts.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
    } else {
      setShowResult(true);
    }
    const nextQuestion1 = currentQuestion1 + 1;
    setCurrentQuestion2(nextQuestion1);
  };

  const [showAnswer, setShowAnswer] = useState(false);

  // Modal Quizz Controller

  const [modal, setModal] = useState(false);

  return (
    <div className="quizzcontroller">
      {/* MODAL CONTROLLER SECTION */}
      <div className="backToHomeContainer" onClick={() => setModal(true)}>
        <i className="fa-solid fa-circle-chevron-left" />
      </div>

      {modal && (
        <div className="backToHomeModal">
          <h3>Êtes vous sûr de vouloir retourner à l'accueil ?</h3>
          <a href="/">
            <input type="submit" value="QUITTER" />
          </a>
          <div className="cancelBackToHome" onClick={() => setModal(true)}>
            <input type="submit" value="ANNULER" />
          </div>
        </div>
      )}
      {/* QUIZZ CONTROLLER SECTION */}
      {showResult ? (
        <QuizzResult CorrectAns={CorrectAns} />
      ) : (
        <>
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {!showAnswer &&
                index >= currentQuestion &&
                index < currentQuestion1 && (
                  <div>
                    <QuestionCard
                      post={post}
                      currentQuestionNumber={index + 1}
                      displayFromQuestionToAnswer={() => setShowAnswer(true)}
                      CorrectAns={CorrectAns}
                      setCorrectAns={setCorrectAns}
                    />
                  </div>
                )}
              {showAnswer &&
                index >= currentQuestion &&
                index < currentQuestion1 && (
                  <div>
                    <QuestionAnswerCard
                      post={post}
                      handleNextQuestion={handleNextQuestion}
                    />
                  </div>
                )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}

export default Quizzcontroller;
