import { useEffect, useState } from "react";
import { deleteQuizz, getAllQuizz } from "../../../services/QuizzService";
import { Link, useParams } from "react-router-dom";
import "./adminpage.scss";
import {
  deleteUserNeedPassword,
  getAllUsers,
} from "../../../services/UserService";

export default function AdminPage() {
  const [collection, setCollection] = useState([]);
  const [modal, setModal] = useState(false);
  const params = useParams();

  const fetchAllQuizz = async () => {
    try {
      const quizzData = await getAllQuizz();
      const orderQuizz = quizzData.sort((a, b) => a.quizzId - b.quizzId);
      setCollection(orderQuizz);
    } catch (error) {
      console.error("Error fetching quizz:", error);
    }
  };

  console.log("collection", collection);

  const fetchAllUsers = async () => {
    try {
      const quizzData = await getAllUsers();
      setCollection(quizzData);
    } catch (error) {
      console.error("Error fetching quizz:", error);
    }
  };

  useEffect(() => {
    if (params.type === "quizz") fetchAllQuizz();
    if (params.type === "user") fetchAllUsers();
  }, [params.type, collection.length]);

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
      <section className="collection-view" style={{ height: "100svh" }}>
        <div className="collection-title-create-container">
          <div className="collection-create-title">
            <h1 className="collection-type-title">{params?.type}</h1>
            <Link
              to={`/admin/${params?.type}/create`}
              className="admin-create-item"
            >
              <i className="fa-solid fa-plus" />
              <p>Créer une nouvelle entrée</p>
            </Link>
          </div>
          <p className="collection-length">
            {collection?.length} {params?.type} trouvées
          </p>
        </div>
        {collection.length > 0 && (
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              {Object.keys(collection[0])
                .slice(0, 5)
                .map((key) => (
                  <span key={key}>{key}</span>
                ))}
            </div>
            {collection.map((value, index) => {
              const AllCollectionKey = Object.keys(collection[0]).slice(0, 5);
              console.log("AllCollectionKey", AllCollectionKey);
              return (
                <div
                  className="entrie-item-button-controller-wrapper"
                  key={index}
                >
                  <Link
                    to={`/admin/${params?.type}/${
                      value?._id || value?.quizzId
                    }`}
                    className="collection-entrie"
                  >
                    <div className="entrie-value-box">
                      {AllCollectionKey.map((key, index) => (
                        <span
                          className={`${
                            key === "isAdmin" ? "isTrueOrFalse" : ""
                          } ${value[key] === true ? "true" : "false"}`}
                          key={index}
                        >
                          {value[key].toString()}
                        </span>
                      ))}
                    </div>
                    <i className="fa-solid fa-pen" />
                  </Link>
                  <PenTrashLayout setModal={setModal} />
                  {modal && (
                    <DeleteEntrieModal
                      setModal={setModal}
                      deleteFunction={async () => {
                        if (params.type === "user") {
                          await deleteUserNeedPassword(value?._id);
                          await fetchAllUsers();
                        }
                        if (params.type === "quizz") {
                          await deleteQuizz(value?.quizzId);
                          await fetchAllQuizz();
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export function PenTrashLayout({ setModal }) {
  return (
    <div className="entrie-controller-box" onClick={() => setModal(true)}>
      <button className="entrie-delete">
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
}

export function DeleteEntrieModal({ setModal, deleteFunction }) {
  return (
    <div className="delete-entrie-modal" onClick={() => setModal(false)}>
      <div
        role="dialog"
        className="delete-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmation-section">
          <h2 className="confirmation-title">Confirmation</h2>
        </div>
        <div className="sc-bdvvtL bOQZK">
          <div className="message-button-box">
            <div className="danger-icon-wrapper">
              <i className="fa-solid fa-circle-exclamation" />
            </div>
            <div className="delete-message-wrapper">
              <span className="delete-message">
                Êtes-vous sûr de vouloir supprimer ceci ?
              </span>
            </div>
          </div>
          <div className="button-section">
            <div className="button-wrapper">
              <button
                aria-disabled="false"
                type="button"
                className="button --cancel"
                onClick={() => setModal(false)}
              >
                <span className="button-message">Cancel</span>
              </button>
              <button
                aria-disabled="false"
                type="button"
                id="confirm-delete"
                className="button --delete"
                onClick={() => {
                  deleteFunction();
                  setModal(false);
                }}
              >
                <i className="fa-solid fa-trash" />
                <span className="button-message">Confirm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
