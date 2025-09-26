import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { configDotenv } from "dotenv";

configDotenv();

const JWT_SECRECT_KEY = process.env.JWT_SECRECT_KEY;

function generateToken(user) {
  if (!JWT_SECRECT_KEY) {
    throw new Error("Please provide a valid JWT SECRET!");
  }

  const Token = jwt.sign({ userId: user._id }, JWT_SECRECT_KEY, {
    expiresIn: "7d",
  });

  return Token;
}

export const SignUp = async (req, res) => {
  const { fullName, email, location, phoneNumber, pinCode, password } = req.body;

  try {
    if (!fullName || !email || !location || !phoneNumber || !pinCode || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must have 8 characters!" });
    }

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User exists! Sign up with new credentials." });
    }

    const user = await UserModel.create({
      fullName,
      email,
      phoneNumber,
      location,
      pinCode,
      password,
    });

    const token = generateToken(user);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: `Error Happened While Signing Up! ${error.message}`,
    });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body; 

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const comparePassword = await user.matchPassword(password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: `Error Happened While Logging In! ${error.message}`,
    });
  }
};

export async function LogOut(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({
      message: `Server error during logout: ${error.message}`,
    });
  }
}

export const GetCurrentUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User data fetched successfully.",
    user: req.user,
  });
};
