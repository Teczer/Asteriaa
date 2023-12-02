import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export const requireAdmin = (req, res, next) => {
  // Assuming that you attach user information to the request object after authentication
  const user = req.user;

  if (user && user.isAdmin === true) {
    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // If not an admin, send a 403 Forbidden response
    res
      .status(403)
      .json({ error: "Permission denied. Admin access required." });
  }
};
