import { query } from "./poolSQL.js";

// FIXED GET ALL QUIZZ NAME = ID

export const getAllQuizz = async () => {
  try {
    const sqlQuery = `
      SELECT
        qu.id AS quizzId,
        qu.quizz_name AS quizzName
      FROM
        quizz qu;`;

    const { rows } = await query(sqlQuery);
    // Formate les noms des clés avec majuscule
    const formattedRows = rows.map((row) => ({
      quizzId: row.quizzid,
      quizzName: row.quizzname,
    }));

    return formattedRows;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séries de quizz :",
      error.message
    );
    throw error;
  }
};

// FIXED GET BY CAT

export const getQuizzSQLByCat = async (quizzType, quizzProgression) => {
  const m = `${quizzType}0${quizzProgression}`;

  const sqlQuery = `
    SELECT
      q.question_value AS questionValue,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'questionAnswer', op.question_answer,
          'isCorrect', op.is_correct
        )
      ) AS questionOptions,
      q.photo_question AS photoQuestion,
      q.photo_answer AS photoAnswer,
      q.answer_explanation AS answerExplanation
    FROM
      question q
      JOIN QuizOption op ON q.id = op.question_id
      JOIN quizz qu ON q.quizz_id = qu.id
    WHERE
      qu.quizz_name = $1
    GROUP BY
      q.id;`;

  const { rows } = await query(sqlQuery, [m]);

  console.log("rows", rows);

  // Organisez les données en format souhaité
  const formattedQuizz = rows.map((row) => ({
    questionValue: row.questionvalue, // Utilisez questionvalue au lieu de questionValue
    photoQuestion: row.photoquestion, // Utilisez photoquestion au lieu de photoQuestion
    photoAnswer: row.photoanswer, // Utilisez photoanswer au lieu de photoAnswer
    answerExplanation: row.answerexplanation, // Utilisez answerexplanation au lieu de answerExplanation
    questionOptions: row.questionoptions, // Utilisez questionoptions au lieu de questionOptions
  }));

  return formattedQuizz;
};

// FIXED GET FULL QUIZZ BY ID

export const getFullQuizz = async (quizzId) => {
  const sqlQuery = `
    SELECT
      qu.quizz_name AS quizzName,
      q.question_value AS questionValue,
      q.photo_question AS photoQuestion,
      q.photo_answer AS photoAnswer,
      q.answer_name AS answerName,
      q.answer_explanation AS answerExplanation,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'questionAnswer', op.question_answer,
          'isCorrect', op.is_correct
        )
      ) AS questionOptions
    FROM
      Quizz qu
      JOIN Question q ON qu.id = q.quizz_id
      JOIN QuizOption op ON q.id = op.question_id
    WHERE
      qu.id = $1
    GROUP BY
      qu.id, q.id;
  `;

  try {
    const { rows } = await query(sqlQuery, [quizzId]);

    if (rows.length === 0) {
      return null; // Aucun quizz trouvé avec ces paramètres
    }

    // Ajoutez cette console de débogage pour voir les données brutes de la requête
    console.log("Raw database rows:", rows);

    // Organise les données en format souhaité
    const quizz = {
      quizzName: rows[0].quizzname, // Utilisez quizzname au lieu de quizzName
      questions: rows.map((row) => ({
        questionValue: row.questionvalue, // Utilisez questionvalue au lieu de questionValue
        photoQuestion: row.photoquestion, // Utilisez photoquestion au lieu de photoQuestion
        photoAnswer: row.photoanswer, // Utilisez photoanswer au lieu de photoAnswer
        answerName: row.answername, // Utilisez answername au lieu de answerName
        answerExplanation: row.answerexplanation, // Utilisez answerexplanation au lieu de answerExplanation
        questionOptions: row.questionoptions, // Utilisez questionoptions au lieu de questionOptions
      })),
    };

    // Ajoutez cette console de débogage pour voir l'objet quizz final
    console.log("Formatted quizz:", quizz);

    return quizz; // Retourne l'objet quizz directement
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du quizz complet :",
      error.message
    );
    throw error; // Propage l'erreur pour une gestion ultérieure
  }
};

// FIXED CREATE

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
    await query("START TRANSACTION");

    // Insérez le nouveau quizz
    const { rows: quizzResult } = await query(
      "INSERT INTO quizz (quizz_name) VALUES ($1) RETURNING id",
      [quizzName]
    );

    // Récupérez l'ID du quizz nouvellement inséré
    const quizzId = quizzResult[0].id;

    // Parcourez chaque question fournie
    for (const question of questions) {
      // Insérez la nouvelle question liée au quizz
      const { rows: questionResult } = await query(
        "INSERT INTO question (quizz_id, question_value, photo_question, photo_answer, answer_name, answer_explanation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
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
      const questionId = questionResult[0].id;

      // Parcourez chaque option de la question
      for (const option of question.questionOptions) {
        // Insérez la nouvelle option de quiz liée à la question
        await query(
          "INSERT INTO quizOption (question_id, question_answer, is_correct) VALUES ($1, $2, $3)",
          [questionId, option.questionAnswer, option.isCorrect]
        );
      }
    }

    // Validez la transaction
    await query("COMMIT");

    console.log("Quizz créé avec succès !");
    return { success: true, message: "Quizz créé avec succès !" };
  } catch (error) {
    // En cas d'erreur, annulez la transaction
    await query("ROLLBACK");

    console.error("Erreur lors de la création du quizz :", error.message);
    return { success: false, message: "Erreur lors de la création du quizz." };
  }
};

// FIXED DELETE

export const deleteQuizzCat = async (quizzId) => {
  try {
    // Démarrez une transaction pour garantir l'intégrité des données
    await query("START TRANSACTION");

    // Supprimez les options de quiz liées aux questions du quizz
    await query(
      "DELETE FROM quizOption WHERE question_id IN (SELECT id FROM question WHERE quizz_id = $1)",
      [quizzId]
    );

    // Supprimez les questions du quizz
    await query("DELETE FROM question WHERE quizz_id = $1", [quizzId]);

    // Supprimez le quizz
    await query("DELETE FROM quizz WHERE id = $1", [quizzId]);

    // Validez la transaction
    await query("COMMIT");

    console.log("Quizz supprimé avec succès !");
    return { success: true, message: "Quizz supprimé avec succès !" };
  } catch (error) {
    // En cas d'erreur, annulez la transaction
    await query("ROLLBACK");

    console.error("Erreur lors de la suppression du quizz :", error.message);
    return {
      success: false,
      message: "Erreur lors de la suppression du quizz.",
    };
  }
};

// UPDATE

export const updateQuizz = async (quizzId, quizzName, questions) => {
  try {
    await query("START TRANSACTION");

    // Mise à jour du nom du quizz
    await query("UPDATE quizz SET quizz_name = $1 WHERE id = $2", [
      quizzName,
      quizzId,
    ]);

    // Supprimer les anciennes options de quiz liées à ce quizz
    await query(
      "DELETE FROM quizOption WHERE question_id IN (SELECT id FROM question WHERE quizz_id = $1)",
      [quizzId]
    );

    // Suppression des anciennes questions liées à ce quizz
    await query("DELETE FROM question WHERE quizz_id = $1", [quizzId]);

    // Insérer les nouvelles questions
    for (const question of questions) {
      const { rows: questionResult } = await query(
        "INSERT INTO question (quizz_id, question_value, photo_question, photo_answer, answer_name, answer_explanation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [
          quizzId,
          question.questionValue,
          question.photoQuestion,
          question.photoAnswer,
          question.answerName,
          question.answerExplanation,
        ]
      );

      const newQuestionId = questionResult[0].id;

      // Insérer les nouvelles options de quiz
      for (const option of question.questionOptions) {
        await query(
          "INSERT INTO quizOption (question_id, question_answer, is_correct) VALUES ($1, $2, $3)",
          [newQuestionId, option.questionAnswer, option.isCorrect]
        );
      }
    }

    await query("COMMIT");

    console.log("Quizz mis à jour avec succès !");
    return { success: true, message: "Quizz mis à jour avec succès !" };
  } catch (error) {
    await query("ROLLBACK");

    console.error("Erreur lors de la mise à jour du quizz :", error.message);
    return {
      success: false,
      message: "Erreur lors de la mise à jour du quizz.",
    };
  }
};
