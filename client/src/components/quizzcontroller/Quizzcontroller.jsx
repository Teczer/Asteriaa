import "./quizzcontroller.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./questionCard/QuestionCard";
import QuestionAnswerCard from "./questionAnswerCard/QuestionAnswerCard";
import QuizzResult from "./quizzResult/QuizzResult";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import Stepper from "./stepper/Stepper";

function Quizzcontroller() {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);
  const params = useParams();

  async function getSqlQuizz(params) {
    try {
      const response = await axios.post("http://mehdiv.fr/quizz", {
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
      // setShowAnswer(false);
      setIsFlipping(false);
    } else {
      setShowResult(true);
    }
    const nextQuestion1 = currentQuestion1 + 1;
    setCurrentQuestion2(nextQuestion1);
  };

  // const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Modal Quizz Controller

  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log("currentQuestion1", currentQuestion1);
  });

  return (
    <div className="quizzcontroller">
      {/* MODAL CONTROLLER SECTION */}
      {modal && (
        <div className="backToHomeModal">
          <h3 className="backtohome-title">
            Êtes vous sûr de vouloir retourner à l'accueil ?
          </h3>
          <a href="/">
            <input type="submit" value="QUITTER" />
          </a>
          <div className="cancelBackToHome" onClick={() => setModal(false)}>
            <input type="submit" value="ANNULER" />
          </div>
        </div>
      )}
      {/* ICON BACK MENU */}
      <div className="question-stepper-wrapper">
        <div className="back-icon-container">
          <i
            className="fa-solid fa-circle-chevron-left"
            onClick={() => setModal(true)}
          />
        </div>
        {/* QUIZZ CONTROLLER SECTION */}
        <Stepper currentQuestion1={currentQuestion1} />
        {showResult ? (
          <QuizzResult CorrectAns={CorrectAns} />
        ) : (
          <>
            {posts.map((post, index) => (
              <React.Fragment key={index}>
                {index >= currentQuestion && index < currentQuestion1 && (
                  <div className="main-zoubli">
                    <div
                      className={classNames(
                        "zoubli",
                        isFlipping && "rotate-card"
                      )}
                    >
                      <QuestionCard
                        post={post}
                        currentQuestionNumber={index + 1}
                        CorrectAns={CorrectAns}
                        setCorrectAns={setCorrectAns}
                        setIsFlipping={setIsFlipping}
                      />
                      {index >= currentQuestion && index < currentQuestion1 && (
                        <QuestionAnswerCard
                          post={post}
                          handleNextQuestion={handleNextQuestion}
                        />
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Quizzcontroller;
