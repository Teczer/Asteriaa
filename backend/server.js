import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jsonServer from "json-server";
import bodyParser from "body-parser";

import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import quizzRouter from "./routes/quizzRouter.js";

dotenv.config({ path: "./.env" });

mongoose.set("strictQuery", true);

// express app
const app = express();

// Middleware CORS pour Express
app.use(cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// server use

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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
