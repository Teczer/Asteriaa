import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  createQuizz,
  getFullQuizzById,
  updateQuizz,
} from "../../../services/QuizzService";
import { createUser, getUser, updateUser } from "../../../services/UserService";

import "./editentrieview.scss";

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
    if (params.type === "quizz" && params.id !== "create") fetchQuizz();
    if (params.type === "user" && params.id !== "create") fetchUser();
    if (params.id === "create") {
      setEntrie([]);
      setEditedEntrie({
        quizzName: "",
        questions: [
          {
            questionValue: "",
            photoQuestion: "",
            photoAnswer: "",
            answerName: "",
            answerExplanation: "",
            questionOptions: [
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
            ],
          },
          {
            questionValue: "",
            photoQuestion: "",
            photoAnswer: "",
            answerName: "",
            answerExplanation: "",
            questionOptions: [
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
            ],
          },
          {
            questionValue: "",
            photoQuestion: "",
            photoAnswer: "",
            answerName: "",
            answerExplanation: "",
            questionOptions: [
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
              { isCorrect: false, questionAnswer: "" },
            ],
          },
        ],
      });
      setEditedUser({
        email: "",
        password: "",
        isAdmin: false, // Assuming isAdmin is a boolean
        userName: "",
        isEmailVerified: false, // Assuming isEmailVerified is a boolean
        profilePicture: "", // You can set a default value or leave it empty
        quizzAstronautes: 0, // You can set a default value or leave it as 0
        quizzGalaxies: 0, // You can set a default value or leave it as 0
        quizzPhenomenesObservables: 0, // You can set a default value or leave it as 0
        quizzSystemeSolaire: 0, // You can set a default value or leave it as 0
        __v0: "", // You can set a default value or leave it empty
        _id: "", // You can set a default value or leave it empty
      });
    }
  }, [params?.id, params?.type]);

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

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].questionOptions[optionIndex][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handleIsCorrectChange = (questionIndex, optionIndex, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];

      // Mettre à false pour toutes les autres options
      newQuestions[questionIndex].questionOptions.forEach(
        (option, idx) => (option.isCorrect = idx === optionIndex && value)
      );

      return { ...prev, questions: newQuestions };
    });
  };

  const handleFieldChange = (questionIndex, field, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePhotoFieldChange = (questionIndex, field, value) => {
    setEditedEntrie((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex][field] = value;
      return { ...prev, questions: newQuestions };
    });
  };

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
              {params?.id === "create" && <p>Create an {params?.type}</p>}
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
                  if (params?.type === "quizz" && params?.id !== "create") {
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
                  if (params?.type === "user" && params?.id !== "create") {
                    try {
                      await updateUser(params?.id, editedUser);
                      setRequestMessage({
                        message: `L'utilisateur  ${entrie?.userName} a bien été modifié`,
                        status: true,
                      });
                    } catch (error) {
                      setRequestMessage({
                        message: `Il y a eu un problème sur la modification de l'utilisateur : ${error}`,
                        status: false,
                      });
                    }
                  }
                  if (params?.id === "create") {
                    if (params?.type === "quizz") {
                      try {
                        await createQuizz(editedEntrie);
                        setRequestMessage({
                          message: `Le quizz a bien été créée`,
                          status: true,
                        });
                      } catch (error) {
                        console.log(
                          "erreur lors de la création du quizz :",
                          error
                        );
                        setRequestMessage({
                          message: `Il y a eu un problème lors de la création du quizz : ${error}`,
                          status: false,
                        });
                      }
                    }
                    if (params?.type === "user") {
                      const createdUserRequest = await createUser(editedUser);
                      console.log("createdUserRequest", createdUserRequest);
                      if (createdUserRequest?.response?.status !== 200) {
                        setRequestMessage({
                          message: createdUserRequest?.response?.data?.error,
                          status: false,
                        });
                      }
                      if (createdUserRequest?.email) {
                        setRequestMessage({
                          message: `L'utilisateur ${editedUser?.userName} a été crée avec succès !`,
                          status: true,
                        });
                      }
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
        <div
          className={`collection-entries-container ${
            params?.type === "quizz" ? "--quizz" : ""
          }`}
        >
          <div className="collection-create-container">
            <div
              className="collection-create-box"
              style={{ width: "100%", borderBottom: "none" }}
            >
              {params?.type === "quizz" && (
                <div className="collection-entries-section-container">
                  <div className="entrie-input-label-box">
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
                </div>
              )}

              {params?.type === "user" &&
                typeof editedUser === "object" &&
                Object.keys(editedUser).map((key, index) => {
                  const inputType = (key) => {
                    if (key === "email" || key === "password") {
                      return key;
                    } else if (key.startsWith("quizz")) {
                      return "number";
                    } else {
                      return "text";
                    }
                  };

                  const isNumberInput = inputType(key) === "number";
                  return (
                    <div className="entrie-input-label-box" key={index}>
                      <label className="collection-create-label" htmlFor={key}>
                        {key}
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      {typeof editedUser[key] === "boolean" &&
                      key !== "isAdmin" ? (
                        <Checkbox
                          checked={editedUser[key]}
                          onChange={(e) =>
                            handleUserChange(key, e.target.checked)
                          }
                        />
                      ) : (
                        <input
                          type={inputType(key)}
                          className={`collection-text-input --overide ${
                            key === "_id" ||
                            (key === "password" && params?.id !== "create") ||
                            key === "googleId" ||
                            key === "email" ||
                            key === "isAdmin" ||
                            key === "__v0"
                              ? "--block"
                              : ""
                          } ${isNumberInput ? "--number-input" : ""}`}
                          value={editedUser[key]}
                          disabled={
                            key === "_id" ||
                            key === "isAdmin" ||
                            key === "googleId" ||
                            key === "email" ||
                            (key === "password" && params?.id !== "create") ||
                            key === "__v0"
                          }
                          onChange={(e) =>
                            handleUserChange(key, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
            </div>
            {params.type === "quizz" &&
              editedEntrie.questions.map((question, questionIndex) => {
                const allCollectionKeys = Object.keys(question);
                return (
                  <div key={questionIndex} className="question-serie-container">
                    <span
                      style={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Question {questionIndex + 1}
                    </span>
                    <div className="collection-entries-section-container">
                      {allCollectionKeys.map((key, keyIndex) => {
                        if (key === "questionOptions") return null;
                        // Add conditions for photoAnswer and photoQuestion
                        const isPhotoField =
                          key === "photoAnswer" || key === "photoQuestion";
                        const fieldType = isPhotoField
                          ? "textarea"
                          : "textarea"; // Change this as needed

                        return (
                          <div
                            className="entrie-input-label-box"
                            key={keyIndex}
                            style={{ width: "100%" }}
                          >
                            <label
                              className="collection-create-label"
                              htmlFor={key}
                            >
                              {key}
                              <span style={{ color: "red" }}> *</span>
                            </label>
                            {isPhotoField ? (
                              <div className="collection-entrie-img-layout">
                                <textarea
                                  type={fieldType}
                                  className="collection-textarea-input"
                                  value={question[key]}
                                  onChange={(e) =>
                                    handlePhotoFieldChange(
                                      questionIndex,
                                      key,
                                      e.target.value
                                    )
                                  }
                                />
                                <img
                                  className="collection-entrie-img"
                                  src={question[key]}
                                  alt={question[key]}
                                />
                              </div>
                            ) : (
                              <textarea
                                type={fieldType}
                                className="collection-textarea-input"
                                value={question[key]}
                                onChange={(e) =>
                                  handleFieldChange(
                                    questionIndex,
                                    key,
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </div>
                        );
                      })}
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
                          </div>
                          <Checkbox
                            checked={option.isCorrect}
                            onChange={(e) =>
                              handleIsCorrectChange(
                                questionIndex,
                                optionIndex,
                                e.target.checked ? 1 : 0
                              )
                            }
                          />
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

export function Checkbox({ checked, onChange }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
}
