import express from "express";
import {
  getAllQuizzController,
  getQuizzByCat,
  createQuizz,
  deleteQuizz,
} from "../controllers/quizzController.js";

const router = express.Router();

// GET all quizz
router.get("/all", getAllQuizzController);

// GET:POST By Cat
router.post("/", getQuizzByCat);

// POST CREATE QUIZZ

router.post("/create", createQuizz);

// DELETE

router.delete("/:quizzId", deleteQuizz);

export default router;
