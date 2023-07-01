import { getQuizzSQL, getQuizzSQLByCat } from "../utils/quizz.js";

// GET QUIZZ

export const getQuizz = async (req, res) => {
  const athletes = await getQuizzSQL();
  res.json(athletes);
};

export const getQuizzByCat = async (req, res) => {
  const { quizzType, quizzProgression } = req.body;

  console.log("quizzType", quizzType);
  console.log("quizzProgression", quizzProgression);

  const athletes = await getQuizzSQLByCat(quizzType, quizzProgression);

  res.json(athletes);
};
