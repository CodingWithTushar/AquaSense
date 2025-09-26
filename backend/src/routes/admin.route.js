import { Router } from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  createEducationPost,
  createHotspot,
  createReport,
  deleteEducationPost,
  deleteHotspot,
  deleteReport,
  editHotspot,
  editReport,
  getAllUser,
  getEducationPostById,
  getHotspotById,
  getReportById,
} from "../controllers/admin.controller.js";

export const AdminRouter = Router();

AdminRouter.use(protectRoute);

AdminRouter.post("/create/education", createEducationPost);
AdminRouter.post("/create/hotspot", createHotspot);
AdminRouter.post("/create/report", createReport);
AdminRouter.put("/edit/hotspot/:id", editHotspot);
AdminRouter.put("/edit/report/:id", editReport);  
AdminRouter.get("/get/education/:id", getEducationPostById);
AdminRouter.get("/get/hotspot/:id", getHotspotById);
AdminRouter.get("/get/report/:id", getReportById);
AdminRouter.delete("/delete/education/:id", deleteEducationPost);
AdminRouter.delete("/delete/hotsport/:id", deleteHotspot);
AdminRouter.delete("/delete/report/:id", deleteReport);
AdminRouter.get("/all/users",getAllUser);