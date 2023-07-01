import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    quizzSystemeSolaire: {
      type: Number,
      required: true,
    },
    quizzGalaxies: {
      type: Number,
      required: true,
    },
    quizzPhenomenesObservables: {
      type: Number,
      required: true,
    },
    quizzAstronautes: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const workoutModel = mongoose.model("Workout", workoutSchema);

// module.exports = mongoose.model("Workout", workoutSchema);

export default workoutModel;
