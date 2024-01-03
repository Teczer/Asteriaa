import "./quizzcontroller.scss";
import React, { useState, useEffect } from "react";
import QuestionCard from "./questionCard/QuestionCard";
import QuestionAnswerCard from "./questionAnswerCard/QuestionAnswerCard";
import QuizzResult from "./quizzResult/QuizzResult";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import Stepper from "./stepper/Stepper";
import AlertModal from "../header/modal/AlertModal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getSqlQuizz } from "../../../services/QuizzService";

function Quizzcontroller() {
  const [posts, setPosts] = useState([]);

  // ANTI-CHEAT for Asteria Users

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSqlQuizz(params);
        setPosts(response);
      } catch (error) {
        console.error(error);
        // Gérez l'erreur comme vous le souhaitez
      }
    }

    fetchData();
  }, []);
  // console.log("posts", posts);
  const params = useParams();

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
    // console.log("currentQuestion1", currentQuestion1);
  });

  // ANTI-CHEAT for Asteria Users

  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    if (user[params.quizzType] < params.quizzProgression) {
      navigate("/filou");
    }
  }, [user]);

  return (
    <div className={`${showResult ? "endingbgimg" : ""}`}>
      <div
        className={`quizzcontroller ${showResult ? "--backgroundblur" : ""}`}
      >
        {/* MODAL CONTROLLER SECTION */}
        {modal && (
          <AlertModal
            setModal={setModal}
            submitFunction={() => (window.location.href = "/")}
            submitValue="QUITTER"
            modalMessage="retourner à l'accueil"
          />
        )}
        {/* ICON BACK MENU */}
        <div
          className={`question-stepper-wrapper ${showResult ? "--result" : ""}`}
        >
          {!showResult && (
            <div className="stepper-leave-container">
              <div className="back-icon-container">
                <i
                  className="fa-solid fa-circle-chevron-left"
                  onClick={() => setModal(true)}
                />
              </div>
              {/* QUIZZ CONTROLLER SECTION */}
              <Stepper currentQuestion1={currentQuestion1} />
            </div>
          )}
          {showResult ? (
            <QuizzResult CorrectAns={CorrectAns} showResult={showResult} />
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
                        {index >= currentQuestion &&
                          index < currentQuestion1 && (
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
    </div>
  );
}

export default Quizzcontroller;
