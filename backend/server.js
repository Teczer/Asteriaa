const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose").set("strictQuery", false);
const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");
const cors = require("cors");

dotenv.config({ path: "./.env" });

// express app
const app = express();

// middleware

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes

app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

// connect to db

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests

		app.listen(process.env.PORT, () => {
			console.log("Server started on Port", process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error);
	});
