const express = require("express");
const {
	createWorkout,
	getWorkout,
	deleteWorkout,
	updateWorkout,
	getWorkouts,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

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

module.exports = router;
