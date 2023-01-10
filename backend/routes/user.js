const express = require("express");

// controller functions
const {
	signupUser,
	loginUser,
	updateUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// UPDATE a single user

router.patch("/:id", updateUser);

module.exports = router;
