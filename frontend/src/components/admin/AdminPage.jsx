import { useEffect, useState } from "react";
import { getAllQuizz } from "../../../services/QuizzService";
import { Link, useParams } from "react-router-dom";
import "./adminpage.scss";
import { getAllUsers } from "../../../services/UserService";

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
  }, [params.type]); // Le tableau vide en second argument signifie que cet effet ne s'exécutera qu'au montage du composant

  console.log("collection", collection);

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
      {params?.type === "quizz" && (
        <section className="collection-view" style={{ height: "100svh" }}>
          <div className="collection-title-create-container">
            <div className="collection-create-title">
              <h1 className="collection-type-title">{params?.type}</h1>
              <a className="admin-create-item">
                <i className="fa-solid fa-plus" />
                <p>Créer une nouvelle entrée</p>
              </a>
            </div>
            <p className="collection-length">
              {collection?.length} {params?.type} trouvées
            </p>
          </div>
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              <span>ID</span>
              <span>quizzName</span>
            </div>
            {collection.length > 0 &&
              collection.map((value, index) => {
                console.log("value", value);
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
                    <div className="entrie-controller-box">
                      <button className="entrie-delete">
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className="entrie-delete">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      )}
      {params?.type === "user" && (
        <section className="collection-view" style={{ height: "100svh" }}>
          <div className="collection-title-create-container">
            <div className="collection-create-title">
              <h1 className="collection-type-title">{params?.type}</h1>
              <a className="admin-create-item">
                <i className="fa-solid fa-plus" />
                <p>Créer une nouvelle entrée</p>
              </a>
            </div>
            <p className="collection-length">
              {collection?.length} {params?.type} trouvées
            </p>
          </div>
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              <span>ID</span>
              <span>EMAIL</span>
              <span>PSEUDO</span>
              <span>VERIFIE</span>
              <span>ADMIN</span>
            </div>
            {collection.length > 0 &&
              collection.map((value, index) => {
                console.log("value", value);
                return (
                  <Link
                    to={`/admin/quizz/${value?.quizzId}`}
                    className="collection-entrie"
                    key={index}
                  >
                    <div className="entrie-value-box">
                      <span>{value?._id}</span>
                      <span>{value?.email}</span>
                      <span>{value?.userName}</span>
                      <span className={`isTrueOrFalse ${value?.isAdmin}`}>
                        {value?.isAdmin?.toString()}
                      </span>
                      <span
                        className={`isTrueOrFalse ${value?.isEmailVerified}`}
                      >
                        {value?.isEmailVerified?.toString()}
                      </span>
                    </div>
                    <div className="entrie-controller-box">
                      <button className="entrie-delete">
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className="entrie-delete">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
}
