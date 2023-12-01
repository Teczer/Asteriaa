import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFullQuizzById, updateQuizz } from "../../../services/QuizzService";
import "./editentrieview.scss";
import Checkbox from "./Checkbox";

export default function EditEntrieView() {
  const [quizz, setQuizz] = useState([]);
  const [editedQuizz, setEditedQuizz] = useState({
    quizzName: "",
    questions: [],
  });
  const [requestMessage, setRequestMessage] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const quizzData = await getFullQuizzById(params?.id);
        setQuizz(quizzData);
        setEditedQuizz({
          quizzName: quizzData?.quizzName || "",
          questions: quizzData?.questions || [],
        });
      } catch (error) {
        console.error("Error fetching quizz:", error);
      }
    };

    fetchQuizz();
  }, [params?.id]);

  const handleQuizzNameChange = (e) => {
    setEditedQuizz((prev) => ({
      ...prev,
      quizzName: e.target.value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].questionOptions[optionIndex][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleAnswerExplanationChange = (questionIndex, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].answerExplanation = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleAnswerNameChange = (questionIndex, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].answerName = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePhotoAnswerChange = (questionIndex, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].photoAnswer = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePhotoQuestionChange = (questionIndex, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].photoQuestion = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleIsCorrectChange = (questionIndex, optionIndex, value) => {
    setEditedQuizz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].questionOptions[optionIndex].isCorrect =
        value;
      return { ...prev, questions: newQuestions };
    });
  };

  console.log("editedQuizz", editedQuizz);

  return (
    <main className="main-content-admin">
      <nav className="collections-type">
        <h3 className="collection-type-titles">
          Collection Types <div className="collection-type-counter">2</div>
        </h3>
        <Link className="collection-type-link" to="/admin/quizz">
          Quizz
        </Link>
        <Link className="collection-type-link" to="/admin/user">
          Utilisateurs
        </Link>
      </nav>
      <section className="collection-view">
        <div className="collection-title-create-container">
          <div className="collection-create-title">
            <h1 className="collection-type-title">{quizz?.quizzName}</h1>
            <div className="collection-entrie-create-message-box">
              <span>{requestMessage}</span>
              <button
                className="admin-create-item"
                onClick={async () => {
                  const patchQuizz = await updateQuizz(params?.id, editedQuizz);
                  setRequestMessage(patchQuizz?.message);
                }}
              >
                <p>Valider</p>
              </button>
            </div>
          </div>
          <p className="collection-length">ID {params?.id}</p>
        </div>
        <div className="collection-entries-container">
          <div className="collection-create-container">
            <div className="collection-create-box" style={{ width: "100%" }}>
              <div className="collection-entries-section-container">
                <label className="collection-create-label" htmlFor="quizzName">
                  quizzName
                  <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  className="collection-text-input --overide"
                  id="quizzName"
                  type="text"
                  value={editedQuizz.quizzName}
                  onChange={handleQuizzNameChange}
                />
              </div>
            </div>
            {editedQuizz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-serie-container">
                <span style={{ color: "white" }}>
                  Question {questionIndex + 1}
                </span>
                <div className="collection-entries-section-container">
                  <label className="collection-create-label" htmlFor="">
                    questionValue
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <textarea
                    type="textarea"
                    className="collection-textarea-input"
                    value={question.questionValue}
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        "questionValue",
                        e.target.value
                      )
                    }
                  />
                  <label className="collection-create-label" htmlFor="">
                    answerExplanation
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <textarea
                    type="textarea"
                    className="collection-textarea-input"
                    value={question.answerExplanation}
                    onChange={(e) =>
                      handleAnswerExplanationChange(
                        questionIndex,
                        e.target.value
                      )
                    }
                  />
                  <label className="collection-create-label" htmlFor="">
                    answerName
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <textarea
                    type="textarea"
                    className="collection-textarea-input"
                    value={question.answerName}
                    onChange={(e) =>
                      handleAnswerNameChange(questionIndex, e.target.value)
                    }
                  />
                  <label className="collection-create-label" htmlFor="">
                    photoAnswer
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <div className="collection-entrie-img-layout">
                    <textarea
                      type="textarea"
                      className="collection-textarea-input"
                      value={question.photoAnswer}
                      onChange={(e) =>
                        handlePhotoAnswerChange(questionIndex, e.target.value)
                      }
                    />
                    <img
                      className="collection-entrie-img"
                      src={question.photoAnswer}
                      alt={question.photoAnswer}
                    />
                  </div>
                  <label className="collection-create-label" htmlFor="">
                    photoQuestion
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <div className="collection-entrie-img-layout">
                    <textarea
                      type="textarea"
                      className="collection-textarea-input"
                      value={question.photoQuestion}
                      onChange={(e) =>
                        handlePhotoQuestionChange(questionIndex, e.target.value)
                      }
                    />
                    <img
                      className="collection-entrie-img"
                      src={question.photoQuestion}
                      alt={question.photoQuestion}
                    />
                  </div>
                </div>
                {/* QUIZZ OPTIONS */}
                <span style={{ color: "white" }}>Question Options</span>
                <div className="collection-entries-section-container">
                  {question.questionOptions.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-container">
                      <label className="collection-create-label" htmlFor="">
                        questionAnswer {optionIndex}
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <div className="collection-answer-checkbox-container">
                        <input
                          type="textarea"
                          className="collection-textarea-input"
                          value={option.questionAnswer}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              "questionAnswer",
                              e.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={option.isCorrect}
                          onChange={(e) =>
                            handleIsCorrectChange(
                              questionIndex,
                              optionIndex,
                              e.target.checked ? 1 : 0
                            )
                          }
                        ></Checkbox>
                      </div>
                      {/* <label className="collection-create-label" htmlFor="">
                      isCorrect {optionIndex}
                      <span style={{ color: "red" }}> *</span>
                    </label> */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
