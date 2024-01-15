import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import config from "../config/index.js";

export const requireAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  // Vérifier si le token existe
  if (token) {
    try {
      // Retirer le préfixe "Bearer" du token
      const tokenWithoutBearer = token.replace("Bearer ", "");

      // Vérifier le token
      const decoded = jwt.verify(tokenWithoutBearer, config.SECRET);

      // Vérifie si l'utilisateur correspondant au token existe
      const user = await User.findById(decoded._id);

      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      // Attacher l'utilisateur au req pour une utilisation ultérieure dans les routes
      req.user = user;

      // Vérifier si l'utilisateur est admin
      if (user.isAdmin) {
        next();
      } else {
        res
          .status(403)
          .json({ error: "Accès interdit. Vous devez être administrateur." });
      }
    } catch (error) {
      res.status(401).json({ error: "Token invalide" });
    }
  } else {
    res.status(401).json({ error: "Token manquant" });
  }
};
