import express from "express";

// controller functions

import {
  signupUser,
  loginUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// UPDATE a single user

router.patch("/:id", updateUser);

// GET single user

router.get("/:id", getUser);

export default router;
