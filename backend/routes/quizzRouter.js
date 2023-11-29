import express from "express";
import {
  getAllQuizzController,
  getQuizzByCat,
  getFullQuizzByIdAndName,
  createQuizz,
  deleteQuizz,
} from "../controllers/quizzController.js";

const router = express.Router();

// GET all quizz
router.get("/all", getAllQuizzController);

// GET:POST By Cat
router.post("/", getQuizzByCat);

// GET FULL QUIZZ BY ID AND NAME
router.post("/getFullQuizz", getFullQuizzByIdAndName);

// POST CREATE QUIZZ

router.post("/create", createQuizz);

// DELETE

router.delete("/:quizzId", deleteQuizz);

export default router;
