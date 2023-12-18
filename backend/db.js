import mongoose from "mongoose";
import config from "./config/index.js";
mongoose.set("strictQuery", true);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Error when connecting to MongoDB", err));
