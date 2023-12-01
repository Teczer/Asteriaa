import express from "express";
import {
  getAllQuizzController,
  getQuizzByCat,
  getFullQuizzById,
  createQuizz,
  deleteQuizz,
  patchQuizz, // Ajout de la fonction de mise à jour
} from "../controllers/quizzController.js";

const router = express.Router();

// GET ALL QUIZZ
router.get("/all", getAllQuizzController);

// GET:POST By Cat
router.post("/", getQuizzByCat);

// GET FULL QUIZZ BY ID
router.get("/:quizzId", getFullQuizzById);

// POST CREATE QUIZZ
router.post("/create", createQuizz);

// PATCH UPDATE QUIZZ
router.patch("/:quizzId", patchQuizz);

// DELETE
router.delete("/:quizzId", deleteQuizz);

export default router;
