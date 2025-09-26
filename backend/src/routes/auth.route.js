import { Router } from "express";
import {
  GetCurrentUser,
  LogIn,
  LogOut,
  SignUp,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/middleware.js";

export const AuthRouter = Router();

AuthRouter.post("/signup", SignUp);
AuthRouter.post("/login", LogIn);
AuthRouter.post("/logout", LogOut);
AuthRouter.get("/me", protectRoute, GetCurrentUser);
