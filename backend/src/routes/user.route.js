import { Router } from "express";
import { protectRoute } from "../middleware/middleware.js";
import { createSupportTicket } from "../controllers/user.controller.js";

export const UserRouter = Router();

UserRouter.post("/create/support", protectRoute, createSupportTicket);
