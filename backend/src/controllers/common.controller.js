import EducationModel from "../models/education.model.js";
import HotspotModel from "../models/hotspot.model.js";
import ReportModel from "../models/report.model.js";
import SupportModel from "../models/support.model.js";

export const getAllSupportPosts = async (req, res) => {
  try {
    const posts = await SupportModel.find();

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No support posts found",
      });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching support posts: ${error.message}`,
    });
  }
};

export const getAllEducationPosts = async (req, res) => {
  try {
    const posts = await EducationModel.find();

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No education posts found",
      });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching education posts: ${error.message}`,
    });
  }
};

export const getAllHotspots = async (req, res) => {
  try {
    const posts = await HotspotModel.find();

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No hotspots found",
      });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching hotspots: ${error.message}`,
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find();

    if (reports.length === 0) {
      return res.status(404).json({
        message: "No reports found",
      });
    }

    return res.status(200).json({ reports });
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching reports: ${error.message}`,
    });
  }
};
