import express from "express";
const router = express.Router();
import User from "../models/userModel";
import sendVerificationEmail from "../utils/sendVerificationEmail";

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

    const verificationToken = "générer_un_token_unique_ici"; // Générez un jeton unique pour chaque demande de vérification

    // Enregistrez le jeton dans la base de données pour vérification ultérieure
    user.verificationToken = verificationToken;
    await user.save();

    // Envoyez l'e-mail de vérification
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
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Jeton de vérification invalide ou expiré" });
    }

    // Marquez l'e-mail de l'utilisateur comme vérifié
    user.isEmailVerified = true;
    user.verificationToken = undefined; // Effacez le jeton de vérification
    await user.save();

    res.status(200).json({ message: "E-mail vérifié avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'e-mail : ", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la vérification de l'e-mail",
    });
  }
});

export default router;
