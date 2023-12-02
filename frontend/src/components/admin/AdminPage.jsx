import { useEffect, useState } from "react";
import { deleteQuizz, getAllQuizz } from "../../../services/QuizzService";
import { Link, useParams } from "react-router-dom";
import "./adminpage.scss";
import {
  deleteUserNeedPassword,
  getAllUsers,
  SECRET_ADMIN_KEY,
} from "../../../services/UserService";

export default function AdminPage() {
  const [collection, setCollection] = useState([]);
  const params = useParams();

  const fetchAllQuizz = async () => {
    try {
      const quizzData = await getAllQuizz();
      setCollection(quizzData);
    } catch (error) {
      console.error("Error fetching quizz:", error);
    }
  };

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

  console.log("collection", collection);

  if (collection && collection.length > 0) {
    console.log("ObjectEntriesCollection", Object.keys(collection[0]));
  }

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
        {collection.length > 0 && params?.type === "quizz" && (
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              {Object.keys(collection[0])
                .filter((key) => key === "quizzId" || key === "quizzName")
                .map((key) => (
                  <span key={key}>{key}</span>
                ))}
            </div>
            {collection.length > 0 &&
              collection.map((value, index) => {
                return (
                  <Link
                    to={`/admin/quizz/${value?.quizzId}`}
                    className="collection-entrie"
                    key={value?.quizzId}
                  >
                    <div className="entrie-value-box">
                      <span>{value?.quizzId}</span>
                      <span>{value?.quizzName}</span>
                    </div>
                    <PenTrashLayout
                      deleteFunction={async () => {
                        await deleteQuizz(value?.quizzId);
                      }}
                    />
                  </Link>
                );
              })}
          </div>
        )}
        {collection.length > 0 && params?.type === "user" && (
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              {Object.keys(collection[0])
                .slice(0, 5)
                .map((key) => (
                  <span key={key}>{key}</span>
                ))}
            </div>
            {collection.length > 0 &&
              collection.map((value, index) => {
                const AllCollectionKey = Object.keys(collection[0]).slice(0, 5);
                console.log("AllCollectionKey", AllCollectionKey);
                return (
                  <Link
                    to={`/admin/user/${value?._id}`}
                    className="collection-entrie"
                    key={index}
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
                    <PenTrashLayout
                      deleteFunction={async () => {
                        await deleteUserNeedPassword(
                          value?._id,
                          "taurarienmoncoquin",
                          SECRET_ADMIN_KEY
                        );
                      }}
                    />
                  </Link>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
}

export function PenTrashLayout({ deleteFunction }) {
  return (
    <div className="entrie-controller-box">
      <button className="entrie-delete">
        <i className="fa-solid fa-pen" />
      </button>
      <button
        className="entrie-delete"
        onClick={() => {
          deleteFunction();
        }}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
}
