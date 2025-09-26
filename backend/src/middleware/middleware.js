import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

configDotenv();

export const protectRoute = async (req, res, next) => {
  const JWT_SECRECT_KEY = process.env.JWT_SECRECT_KEY;
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({
        message: "UnAuthorized : No Token provided!",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRECT_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "UnAuthorized : Invalid Token!",
      });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "UnAuthorized : User not Found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token!",
      error: error.message,
    });
  }
};
