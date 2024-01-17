import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import config from "../config/index.js";

export const requireAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    const tokenWithoutBearer = token?.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(tokenWithoutBearer, config.SECRET);

      // Vérifie si l'utilisateur correspondant au token existe
      const user = await User.findById(decoded._id);

      // Extraire l'ID du chemin de la requête
      const urlPath = req._parsedUrl.pathname;
      const tokenId = decoded._id;
      const idPath = urlPath.split("/").pop();

      console.log("tokenId", tokenId);
      console.log("idPath", idPath);

      if (idPath !== tokenId && user.isAdmin === false) {
        return res.status(401).json({
          error: "Vous ne pouvez pas modifier un autre utilisateur !",
        });
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
