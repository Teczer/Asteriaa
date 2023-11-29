import { pool } from "./poolSQL.js";

// GET

export const getAllQuizz = async () => {
  try {
    const sqlQuery = `
        SELECT
          qu.id AS quizzId,
          qu.quizz_name AS quizzName
        FROM
          Quizz qu;`;

    const [rows] = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séries de quizz :",
      error.message
    );
    throw error;
  }
};

export const getQuizzSQLByCat = async (quizzType, quizzProgression) => {
  const m = `${quizzType}0${quizzProgression}`;

  console.log("c'est m", m);
  const sqlQuery = `
  SELECT
    q.question_value AS questionValue,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'questionAnswer', op.question_answer,
            'isCorrect', op.is_correct
        )
    ) AS questionOptions,
    q.photo_question AS photoQuestion,
    q.photo_answer AS photoAnswer,
    q.answer_explanation AS answerExplanation
FROM
    Question q
    JOIN QuizOption op ON q.id = op.question_id
    JOIN Quizz qu ON q.quizz_id = qu.id
WHERE
    qu.quizz_name = ?
GROUP BY
    q.id;`;
  const [rows] = await pool.query(sqlQuery, [m]);

  console.log("rows", rows);
  return rows;
};

export const getFullQuizz = async (quizzId, quizzName) => {
  const sqlQuery = `
    SELECT
      qu.quizz_name AS quizzName,
      q.question_value AS questionValue,
      q.photo_question AS photoQuestion,
      q.photo_answer AS photoAnswer,
      q.answer_name AS answerName,
      q.answer_explanation AS answerExplanation,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'questionAnswer', op.question_answer,
          'isCorrect', op.is_correct
        )
      ) AS questionOptions
    FROM
      Quizz qu
      JOIN Question q ON qu.id = q.quizz_id
      JOIN QuizOption op ON q.id = op.question_id
    WHERE
      qu.id = ? AND qu.quizz_name = ?
    GROUP BY
      qu.id, q.id;
  `;

  const [rows] = await pool.query(sqlQuery, [quizzId, quizzName]);

  if (rows.length === 0) {
    return null; // Aucun quizz trouvé avec ces paramètres
  }

  // Organise les données en format souhaité
  const quizz = {
    quizzName: rows[0].quizzName,
    questions: rows.map((row) => ({
      questionValue: row.questionValue,
      photoQuestion: row.photoQuestion,
      photoAnswer: row.photoAnswer,
      answerName: row.answerName,
      answerExplanation: row.answerExplanation,
      questionOptions: row.questionOptions,
    })),
  };
  return quizz; // Retourne l'objet quizz directement
};

// CREATE

export const createQuizzCat = async (quizzName, questions) => {
  try {
    // Vérifiez que le tableau questions contient exactement 3 objets
    if (!Array.isArray(questions) || questions.length !== 3) {
      return {
        success: false,
        message: "Le tableau de questions doit contenir exactement 3 objets.",
      };
    }
    // Démarrez une transaction pour garantir l'intégrité des données
    await pool.query("START TRANSACTION");

    // Insérez le nouveau quizz
    const [quizzResult] = await pool.query(
      "INSERT INTO Quizz (quizz_name) VALUES (?)",
      [quizzName]
    );

    // Récupérez l'ID du quizz nouvellement inséré
    const quizzId = quizzResult.insertId;

    // Parcourez chaque question fournie
    for (const question of questions) {
      // Insérez la nouvelle question liée au quizz
      const [questionResult] = await pool.query(
        "INSERT INTO Question (quizz_id, question_value, photo_question, photo_answer, answer_name, answer_explanation) VALUES (?, ?, ?, ?, ?, ?)",
        [
          quizzId,
          question.questionValue,
          question.photoQuestion,
          question.photoAnswer,
          question.answerName,
          question.answerExplanation,
        ]
      );

      // Récupérez l'ID de la question nouvellement insérée
      const questionId = questionResult.insertId;

      // Parcourez chaque option de la question
      for (const option of question.questionOptions) {
        // Insérez la nouvelle option de quiz liée à la question
        await pool.query(
          "INSERT INTO QuizOption (question_id, question_answer, is_correct) VALUES (?, ?, ?)",
          [questionId, option.questionAnswer, option.isCorrect]
        );
      }
    }

    // Validez la transaction
    await pool.query("COMMIT");

    console.log("Quizz créé avec succès !");
    return { success: true, message: "Quizz créé avec succès !" };
  } catch (error) {
    // En cas d'erreur, annulez la transaction
    await pool.query("ROLLBACK");

    console.error("Erreur lors de la création du quizz :", error.message);
    return { success: false, message: "Erreur lors de la création du quizz." };
  }
};

// DELETE

export const deleteQuizzCat = async (quizzId) => {
  try {
    // Démarrez une transaction pour garantir l'intégrité des données
    await pool.query("START TRANSACTION");

    // Supprimez les options de quiz liées aux questions du quizz
    await pool.query(
      "DELETE FROM QuizOption WHERE question_id IN (SELECT id FROM Question WHERE quizz_id = ?)",
      [quizzId]
    );

    // Supprimez les questions du quizz
    await pool.query("DELETE FROM Question WHERE quizz_id = ?", [quizzId]);

    // Supprimez le quizz
    await pool.query("DELETE FROM Quizz WHERE id = ?", [quizzId]);

    // Validez la transaction
    await pool.query("COMMIT");

    console.log("Quizz supprimé avec succès !");
    return { success: true, message: "Quizz supprimé avec succès !" };
  } catch (error) {
    // En cas d'erreur, annulez la transaction
    await pool.query("ROLLBACK");

    console.error("Erreur lors de la suppression du quizz :", error.message);
    return {
      success: false,
      message: "Erreur lors de la suppression du quizz.",
    };
  }
};
