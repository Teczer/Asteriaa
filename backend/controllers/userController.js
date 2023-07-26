import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      userName: user.userName,
      profilePicture: user.profilePicture,
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

// SIGNUP USER

// signup user
export const signupUser = async (req, res) => {
  const {
    email,
    password,
    isAdmin,
    userName,
    profilePicture,
    quizzSystemeSolaire,
    quizzGalaxies,
    quizzPhenomenesObservables,
    quizzAstronautes,
  } = req.body;

  try {
    // Create the user using the signup method
    const user = await User.signup(
      email,
      password,
      isAdmin,
      userName,
      profilePicture,
      quizzSystemeSolaire,
      quizzGalaxies,
      quizzPhenomenesObservables,
      quizzAstronautes
    );

    // Set isEmailVerified to false and verificationToken to undefined for new users
    user.isEmailVerified = false;
    user.verificationToken = undefined;

    // Save the changes to the user document
    await user.save();

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      isAdmin,
      isEmailVerified: user.isEmailVerified,
      userName,
      profilePicture,
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

// UPDATE A USER

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  // Check if the new userName already exists in the database (excluding the current user)
  const existingUser = await User.findOne({ userName, _id: { $ne: id } });
  if (existingUser) {
    return res.status(400).json({
      error: "Le nom d'utilisateur est déjà utilisé par un autre utilisateur",
    });
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true } // To get the updated user as the result
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

// DELETE AN EXISTING USER

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

	console.log('STARTid', id);
	console.log('STARTpass', password);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID d'utilisateur invalide" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // Vérifiez si le mot de passe fourni correspond au mot de passe de l'utilisateur
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('bcryptPass', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Ce mot de passe était incorrect. Veuillez réessayer." });
    }

    // Supprimer l'utilisateur de la base de données
    await User.findByIdAndRemove(id);

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
