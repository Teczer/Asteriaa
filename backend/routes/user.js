import express from "express";
import multer from "multer";

import {
  signupUser,
  loginUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

// Créez un middleware multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Choisissez le répertoire de destination approprié
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes de l'utilisateur

// Route de connexion
router.post("/login", loginUser);

// Route d'inscription
router.post("/signup", signupUser);

// Route de mise à jour d'un utilisateur
router.patch("/:id", upload.single("profilePicture"), updateUser);

// Route d'obtention d'un utilisateur
router.get("/:id", getUser);

export default router;
