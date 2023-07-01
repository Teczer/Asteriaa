import express from "express";

import {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

//GET single workout
router.get("/:id", getWorkout);

// POST NEW workout

router.post("/", createWorkout);

// DELETE single workout

router.delete("/:id", deleteWorkout);

// UPDATE a single workout

router.patch("/:id", updateWorkout);

export default router;
