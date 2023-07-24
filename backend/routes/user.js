import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

dotenv.config({ path: "../.env" });

// controller functions

import {
  signupUser,
  loginUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// UPDATE a single user

router.patch("/:id", updateUser);

// GET single user

router.get("/:id", getUser);

export default router;

// VERIFICATION PHASE

// Route pour envoyer l'e-mail de vérification
router.post("/send-verification-email", async (req, res) => {
  const { email, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (user.email !== email) {
      return res
        .status(400)
        .json({ error: "L'adresse e-mail ne correspond pas à l'utilisateur" });
    }

    // Générer un jeton de vérification avec une clé secrète
    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Durée de validité du token
      }
    );

    console.log("userFROMSending", user);

    // Enregistrez le jeton dans la base de données pour vérification ultérieure
    user.verificationToken = verificationToken;
    await user.save();

    // Envoyez l'e-mail de vérification avec le lien contenant le token
    await sendVerificationEmail(email, verificationToken);

    res
      .status(200)
      .json({ message: "E-mail de vérification envoyé avec succès !" });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de vérification : ",
      error
    );
    res.status(500).json({
      error:
        "Une erreur est survenue lors de l'envoi de l'e-mail de vérification",
    });
  }
});

// Route pour traiter la vérification de l'e-mail
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    // Vérifiez le token avec la clé secrète utilisée pour le générer
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Jeton de vérification invalide ou expiré" });
    }

    console.log("userFROMVerification", user);
    // Marquez l'e-mail de l'utilisateur comme vérifié
    user.isEmailVerified = true;
    user.verificationToken = undefined; // Effacez le jeton de vérification

    // Enregistrez les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: "E-mail vérifié avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'e-mail : ", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la vérification de l'e-mail",
    });
  }
});
