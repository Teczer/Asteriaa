import express from "express";
import cors from "cors";
import session from "express-session";

import config from "./config/index.js";
import userRoutes from "./routes/user.js";
import quizzRouter from "./routes/quizzRouter.js";
import authRouter from "./routes/auth.js";
import passport from "./passport/index.js";

import "./db.js";

// express app
const app = express();

// Middleware CORS pour Express
app.use(
  cors({
    origin: config.frontURL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: config.sessionSecretPassword,
    resave: false,
    saveUninitialized: true,
  })
);

// Permet d'afficher les logs des requêtes dans la console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/user", userRoutes);
app.use("/quizz", quizzRouter);
app.use("/auth", authRouter);

app.listen(config.PORT, () => {
  console.log("Server started on Port", config.PORT);
});
