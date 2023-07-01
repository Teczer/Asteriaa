import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/userModel.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log("feefzezf", user);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      quizzSystemeSolaire: user.quizzSystemeSolaire,
      quizzGalaxies: user.quizzGalaxies,
      quizzPhenomenesObservables: user.quizzPhenomenesObservables,
      quizzAstronautes: user.quizzAstronautes,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// signup user
export const signupUser = async (req, res) => {
  const {
    email,
    password,
    quizzSystemeSolaire,
    quizzGalaxies,
    quizzPhenomenesObservables,
    quizzAstronautes,
  } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      quizzSystemeSolaire,
      quizzGalaxies,
      quizzPhenomenesObservables,
      quizzAstronautes
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      quizzSystemeSolaire,
      quizzGalaxies,
      quizzPhenomenesObservables,
      quizzAstronautes,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// get a single workout
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};
