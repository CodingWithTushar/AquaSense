import { Router } from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  getAllEducationPosts,
  getAllHotspots,
  getAllReports,
  getAllSupportPosts,
} from "../controllers/common.controller.js";

export const CommonRouter = Router();

CommonRouter.use(protectRoute);

CommonRouter.get("/education", getAllEducationPosts);
CommonRouter.get("/support", getAllSupportPosts);
CommonRouter.get("/hotspot", getAllHotspots);
CommonRouter.get("/report", getAllReports)
