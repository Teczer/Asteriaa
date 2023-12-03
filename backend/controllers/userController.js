import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";

// Importer le module path
import path from "path";

// Convertir l'URL du module en chemin de fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construire le chemin absolu vers le fichier .env
const envPath = path.resolve(__dirname, "../.env");

// Charger les variables d'environnement depuis le fichier .env
dotenvConfig({ path: envPath });

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
  const { secretadminkey } = req.headers;

  if (secretadminkey !== process.env.SECRET_ADMIN_KEY) {
    return res.status(401).json({
      error: "Vous n'avez pas l'autorisation de modifier un utilisateur !",
    });
  }

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

// GET A SINGLE USER BY ID

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

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  const { secretadminkey } = req.headers;

  if (secretadminkey !== process.env.SECRET_ADMIN_KEY) {
    return res.status(401).json({
      error:
        "Vous n'avez pas l'autorisation de récuperer les informations de tout les utilisateurs !",
    });
  }

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

// DELETE AN EXISTING USER

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const { secretadminkey } = req.headers;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID d'utilisateur invalide" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (user.isAdmin === true) {
      return res
        .status(401)
        .json({ message: "Vous ne pouvez pas supprimer un Administrateur" });
    }

    // Si la clé secrète est égale à "process.env.SECRET_ADMIN_KEY", supprime l'utilisateur sans vérifier le mot de passe
    if (secretadminkey === process.env.SECRET_ADMIN_KEY) {
      await User.findByIdAndRemove(id);
      return res
        .status(200)
        .json({ message: "Utilisateur supprimé avec succès" });
    }

    // Vérifiez si le mot de passe fourni correspond au mot de passe de l'utilisateur
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("bcryptPass", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Ce mot de passe était incorrect. Veuillez réessayer.",
      });
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

// CREATE USER

export const createUser = async (req, res) => {
  const {
    email,
    password,
    isAdmin,
    isEmailVerified,
    userName,
    profilePicture,
    quizzSystemeSolaire,
    quizzGalaxies,
    quizzPhenomenesObservables,
    quizzAstronautes,
  } = req.body;
  const { secretadminkey } = req.headers;

  if (secretadminkey !== process.env.SECRET_ADMIN_KEY) {
    return res.status(401).json({
      error: "Vous n'avez pas l'autorisation de créer un utilisateur !",
    });
  }

  // Vérifier que tous les champs nécessaires sont remplis et ne sont pas vides
  if (
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    typeof isAdmin === "undefined" ||
    typeof isEmailVerified === "undefined" ||
    !userName ||
    userName.trim() === "" ||
    !profilePicture ||
    profilePicture.trim() === "" ||
    typeof quizzSystemeSolaire === "undefined" ||
    typeof quizzGalaxies === "undefined" ||
    typeof quizzPhenomenesObservables === "undefined" ||
    typeof quizzAstronautes === "undefined"
  ) {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être remplis" });
  }

  try {
    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    }

    // Générer le sel avec bcrypt
    const salt = await bcrypt.genSalt(10);

    // Hasher le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password
    const newUser = await User.create({
      email,
      password: hashedPassword,
      isAdmin,
      isEmailVerified,
      userName,
      profilePicture,
      quizzSystemeSolaire,
      quizzGalaxies,
      quizzPhenomenesObservables,
      quizzAstronautes,
    });

    // create a token
    const token = createToken(newUser._id);

    res.status(200).json({
      email,
      token,
      isAdmin: newUser.isAdmin,
      isEmailVerified: newUser.isEmailVerified,
      userName: newUser.userName,
      profilePicture: newUser.profilePicture,
      quizzSystemeSolaire: newUser.quizzSystemeSolaire,
      quizzGalaxies: newUser.quizzGalaxies,
      quizzPhenomenesObservables: newUser.quizzPhenomenesObservables,
      quizzAstronautes: newUser.quizzAstronautes,
      _id: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
