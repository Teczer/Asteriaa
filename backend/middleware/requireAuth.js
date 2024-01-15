import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import config from "../config/index.js";

export const requireAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  // Retirer le préfixe "Bearer" du token
  const tokenWithoutBearer = token.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(tokenWithoutBearer, config.SECRET);

      // Vérifie si l'utilisateur correspondant au token existe
      const user = await User.findById(decoded._id);

      if (!user || user._id.toString() !== decoded._id) {
        // Si l'utilisateur n'est pas trouvé ou si les identifiants ne correspondent pas
        throw new Error("Accès interdit");
      }

      // Attache l'utilisateur au req pour une utilisation ultérieure dans les routes
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token invalide" });
    }
  } else {
    res.status(401).json({ error: "Token manquant" });
  }
};
