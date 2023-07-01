import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jsonServer from "json-server";

import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import quizzRouter from "./routes/quizzRouter.js";

dotenv.config({ path: "./.env" });

mongoose.set("strictQuery", true);

// express app
const app = express();
app.use(cors());
const server = jsonServer.create();
server.use(cors());
const middlewares = jsonServer.defaults();

// server use

server.use(jsonServer.bodyParser);
server.use(middlewares);

// middleware

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);
app.use("/quizz", quizzRouter);

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
