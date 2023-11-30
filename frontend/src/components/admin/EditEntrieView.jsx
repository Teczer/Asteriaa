import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFullQuizzById } from "../../../services/QuizzService";

export default function EditEntrieView() {
  const [quizz, setQuizz] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const quizzData = await getFullQuizzById(params?.id);
        setQuizz(quizzData);
      } catch (error) {
        console.error("Error fetching quizz:", error);
      }
    };

    fetchQuizz();
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
      <section className="collection-view">
        <div className="collection-title-create-container">
          <div className="collection-create-title">
            <h1 className="collection-type-title">{quizz?.quizzName}</h1>
            <a className="admin-create-item">
              <p>Valider</p>
            </a>
          </div>
          <p className="collection-length">ID {params?.id}</p>
        </div>
        <div className="collection-entries-container">
          <div className="collection-layout-info">
            <span>ID</span>
            <span>quizzName</span>
          </div>
        </div>
      </section>
    </main>
  );
}
