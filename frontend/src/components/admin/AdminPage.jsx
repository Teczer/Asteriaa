import { useEffect, useState } from "react";
import { getAllQuizz } from "../../../services/QuizzService";
import { Link, useParams } from "react-router-dom";
import "./adminpage.scss";

export default function AdminPage() {
  const [quizz, setQuizz] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchAllQuizz = async () => {
      try {
        const quizzData = await getAllQuizz();
        setQuizz(quizzData);
      } catch (error) {
        console.error("Error fetching quizz:", error);
      }
    };

    fetchAllQuizz();
  }, []); // Le tableau vide en second argument signifie que cet effet ne s'exécutera qu'au montage du composant

  console.log("quizz", quizz);

  return (
    <main className="main-content-admin">
      <nav className="collections-type">
        <Link className="collection-type-link" to="/admin/quizz">
          Quizz
        </Link>
        <Link className="collection-type-link" to="/admin/user">
          Utilisateurs
        </Link>
      </nav>
      {params?.type === "quizz" && (
        <section className="collection-view">
          <div className="collection-title-create-container">
            <div className="collection-create-title">
              <h1 className="collection-type-title">{params?.type}</h1>
              <a className="admin-create-item">
                <i className="fa-solid fa-plus" />
                <p>Créer une nouvelle entrée</p>
              </a>
            </div>
            <p className="collection-length">
              {quizz?.length} {params?.type} trouvées
            </p>
          </div>
          <div className="collection-entries-container">
            <div className="collection-layout-info">
              <span>ID</span>
              <span>quizzName</span>
            </div>
            {quizz.length > 0 &&
              quizz.map((value, index) => {
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
    </main>
  );
}
