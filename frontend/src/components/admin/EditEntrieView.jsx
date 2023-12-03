import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFullQuizzById, updateQuizz } from "../../../services/QuizzService";
import "./editentrieview.scss";
import Checkbox from "./Checkbox";
import { getUser, updateUser } from "../../../services/UserService";

export default function EditEntrieView() {
  const [entrie, setEntrie] = useState([]);
  const [editedEntrie, setEditedEntrie] = useState({
    quizzName: "",
    questions: [],
  });
  const [editedUser, setEditedUser] = useState();
  const [requestMessage, setRequestMessage] = useState({
    message: null,
    status: null,
  });

  const params = useParams();

  const fetchQuizz = async () => {
    try {
      const quizzData = await getFullQuizzById(params?.id);
      setEntrie(quizzData);
      setEditedEntrie({
        quizzName: quizzData?.quizzName || "",
        questions: quizzData?.questions || [],
      });
    } catch (error) {
      console.error("Error fetching entrie:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getUser(params?.id);
      setEntrie(user);
      setEditedUser(user || "");
    } catch (error) {
      console.error("Error fetching entrie:", error);
    }
  };

  useEffect(() => {
    if (params.type === "quizz") fetchQuizz();
    if (params.type === "user") fetchUser();
  }, [params?.id]);

  const handleUserChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuizzNameChange = (e) => {
    setEditedEntrie((prev) => ({
      ...prev,
      quizzName: e.target.value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].questionOptions[optionIndex][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleAnswerExplanationChange = (questionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].answerExplanation = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleAnswerNameChange = (questionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].answerName = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePhotoAnswerChange = (questionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].photoAnswer = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePhotoQuestionChange = (questionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].photoQuestion = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleIsCorrectChange = (questionIndex, optionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].questionOptions[optionIndex].isCorrect =
        value;
      return { ...prev, questions: newQuestions };
    });
  };

  console.log("requestMessage", requestMessage);

  return (
    <main className="main-content-admin">
      <nav className="collections-type">
        <h3 className="collection-type-titles">
          Collection Typess <div className="collection-type-counter">2</div>
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
            <h1 className="collection-type-title">
              {entrie?.quizzName || entrie?.userName}
            </h1>
            <div className="collection-entrie-create-message-box">
              <span
                className={`request-message ${
                  requestMessage?.status === true ? "--success" : "--error"
                }`}
              >
                {requestMessage?.message}
              </span>
              <button
                className="admin-create-item"
                onClick={async () => {
                  if (params?.type === "quizz") {
                    try {
                      const patchQuizz = await updateQuizz(
                        params?.id,
                        editedEntrie
                      );
                      setRequestMessage({
                        message: patchQuizz?.message,
                        status: true,
                      });
                    } catch (error) {
                      setRequestMessage({
                        message: `Il y a eu un problème sur la modification du quizz : ${error}`,
                        status: false,
                      });
                    }
                  }
                  if (params?.type === "user") {
                    try {
                      const patchUser = await updateUser(
                        params?.id,
                        editedUser
                      );

                      setRequestMessage({
                        message: `L'utilisateur a bien été modifié ${entrie?.userName}`,
                        status: true,
                      });
                    } catch (error) {
                      setRequestMessage({
                        message: `Il y a eu un problème sur la modification de l'utilisateur : ${error}`,
                        status: false,
                      });
                    }
                  }
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
            <div
              className="collection-create-box"
              style={{ width: "100%", borderBottom: "none" }}
            >
              {params?.type === "quizz" && (
                <div className="collection-entries-section-container">
                  <label
                    className="collection-create-label"
                    htmlFor="quizzName"
                  >
                    quizzName
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="collection-text-input --overide"
                    id="quizzName"
                    type="text"
                    value={editedEntrie?.quizzName}
                    onChange={handleQuizzNameChange}
                  />
                </div>
              )}

              {params?.type === "user" &&
                typeof editedUser === "object" &&
                Object.keys(editedUser).map((key, index) => (
                  <div className="entrie-input-label-box" key={index}>
                    <label className="collection-create-label" htmlFor={key}>
                      {key}
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <input
                      type="text"
                      className={`collection-text-input --overide ${
                        key === "_id" || key === "password" ? "--block" : ""
                      }`}
                      value={editedUser[key]}
                      disabled={key === "_id" || key === "password"}
                      onChange={(e) => handleUserChange(key, e.target.value)}
                    />
                  </div>
                ))}
            </div>
            {params.type === "quizz" &&
              editedEntrie.questions.map((question, questionIndex) => {
                console.log("yo");
                const AllCollectionKey = Object.keys(question);
                console.log("AllCollectionKey", AllCollectionKey);
                return (
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
                        value={question?.questionValue}
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
                        value={question?.answerExplanation}
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
                        value={question?.answerName}
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
                          value={question?.photoAnswer}
                          onChange={(e) =>
                            handlePhotoAnswerChange(
                              questionIndex,
                              e.target.value
                            )
                          }
                        />
                        <img
                          className="collection-entrie-img"
                          src={question?.photoAnswer}
                          alt={question?.photoAnswer}
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
                          value={question?.photoQuestion}
                          onChange={(e) =>
                            handlePhotoQuestionChange(
                              questionIndex,
                              e.target.value
                            )
                          }
                        />
                        <img
                          className="collection-entrie-img"
                          src={question?.photoQuestion}
                          alt={question?.photoQuestion}
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
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
