import {
  getAllQuizz,
  getQuizzSQLByCat,
  getFullQuizz,
  createQuizzCat,
  deleteQuizzCat,
} from "../utils/quizz.js";

// GET QUIZZ

export const getAllQuizzController = async (req, res) => {
  try {
    const allQuizz = await getAllQuizz();
    res.json(allQuizz);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des séries de quizz." });
  }
};

export const getQuizzByCat = async (req, res) => {
  const { quizzType, quizzProgression } = req.body;

  console.log("quizzType", quizzType);
  console.log("quizzProgression", quizzProgression);

  const quizz = await getQuizzSQLByCat(quizzType, quizzProgression);

  res.json(quizz);
};

export const getFullQuizzByIdAndName = async (req, res) => {
  const { quizzId, quizzName } = req.body;

  try {
    const quizz = await getFullQuizz(quizzId, quizzName);

    if (!quizz || !quizz.quizzName || !quizz.questions) {
      return res
        .status(404)
        .json({ success: false, message: "Quizz non trouvé." });
    }

    const responseQuizz = {
      quizzName: quizz.quizzName,
      questions: quizz.questions.map((question) => {
        const {
          questionValue,
          photoQuestion,
          photoAnswer,
          answerName,
          answerExplanation,
          questionOptions,
        } = question;

        return {
          questionValue,
          photoQuestion,
          photoAnswer,
          answerName,
          answerExplanation,
          questionOptions,
        };
      }),
    };

    res.json(responseQuizz); // Retourne directement l'objet responseQuizz
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du quizz complet :",
      error.message
    );
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

// POST CREATE QUIZZ

export const createQuizz = async (req, res) => {
  const { quizzName, questions } = req.body;

  console.log("quizzName", quizzName);
  console.log("questions", questions);

  const result = await createQuizzCat(quizzName, questions);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result);
  }
};

// DELETE QUIZZ

export const deleteQuizz = async (req, res) => {
  const { quizzId } = req.params;

  const result = await deleteQuizzCat(quizzId);

  res.json(result);
};
