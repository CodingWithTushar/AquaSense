import EducationModel from "../models/education.model.js";
import HotspotModel from "../models/hotspot.model.js";
import ReportModel from "../models/report.model.js";
import UserModel from "../models/user.model.js";

export const createEducationPost = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "All fields (title, description, category) are required",
      });
    }

    const post = await EducationModel.create({
      title,
      description,
      category,
    });

    if (!post) {
      return res.status(400).json({
        message: "Can not create this post",
      });
    }

    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: `Error while creating education post: ${error.message}`,
    });
  }
};

export const getEducationPostById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const post = await EducationModel.findById(id);

    if (!post) {
      return res
        .status(400)
        .json({ message: "Can not find Post with this Id" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: `Error while getting education post: ${error.message}`,
    });
  }
};

export const deleteEducationPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const post = await EducationModel.deleteOne({ _id: id });

    if (post.deletedCount === 0) {
      return res.status(404).json({ message: "No post found with this ID" });
    }

    return res
      .status(200)
      .json({ message: "Post has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Error while deleting education post: ${error.message}`,
    });
  }
};

export const createHotspot = async (req, res) => {
  const { areaName, location, disease, casesReported, severity } = req.body;

  try {
    if (!areaName || !location || !disease || !casesReported || !severity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hotspot = await HotspotModel.create({
      areaName,
      location,
      disease,
      casesReported,
      severity,
    });

    if (!hotspot) {
      return res.status(400).json({ message: "Can not create hotspot post" });
    }

    return res.status(200).json({ hotspot });
  } catch (error) {
    return res.status(500).json({
      message: `Error while creating hotspot post: ${error.message}`,
    });
  }
};

export const editHotspot = async (req, res) => {
  const { areaName, location, disease, casesReported, severity } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const hotspot = await HotspotModel.findByIdAndUpdate(
      id,
      { areaName, location, disease, casesReported, severity },
      { new: true }
    );

    if (!hotspot) {
      return res.status(404).json({ message: "Hotspot not found" });
    }

    return res.status(200).json({
      message: "Hotspot updated successfully",
      hotspot,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error while editing hotspot post: ${error.message}`,
    });
  }
};

export const getHotspotById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const hotspot = await HotspotModel.findById(id);

    if (!hotspot) {
      return res
        .status(404)
        .json({ message: "Can not find hotspot with this Id" });
    }

    return res.status(200).json({ hotspot });
  } catch (error) {
    return res.status(500).json({
      message: `Error while getting hotspot post: ${error.message}`,
    });
  }
};

export const deleteHotspot = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const hotspot = await HotspotModel.deleteOne({ _id: id });

    if (hotspot.deletedCount === 0) {
      return res.status(404).json({ message: "No post found with this ID" });
    }

    return res
      .status(200)
      .json({ message: "Hotspot has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Error while deleting Hotspot: ${error.message}`,
    });
  }
};

export const createReport = async (req, res) => {
  const {
    colour,
    hardness,
    Odour,
    phValue,
    turbidityNTU,
    totalDissolvedSolids,
  } = req.body;

  try {
    if (
      !colour ||
      !hardness ||
      !Odour ||
      !phValue ||
      !turbidityNTU ||
      !totalDissolvedSolids
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const report = await ReportModel.create({
      colour,
      hardness,
      Odour,
      phValue,
      turbidityNTU,
      totalDissolvedSolids,
    });

    if (!report) {
      return res.status(400).json({ message: "Can not create this report" });
    }

    return res.status(201).json({ report });
  } catch (error) {
    return res.status(500).json({
      message: `Error while creating report: ${error.message}`,
    });
  }
};

export const editReport = async (req, res) => {
  const {
    colour,
    hardness,
    Odour,
    phValue,
    turbidityNTU,
    totalDissolvedSolids,
  } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const report = await ReportModel.findByIdAndUpdate(
      id,
      { colour, hardness, Odour, phValue, turbidityNTU, totalDissolvedSolids },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({
      message: "Report updated successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error while editing report: ${error.message}`,
    });
  }
};

export const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const report = await ReportModel.findById(id);

    if (!report) {
      return res
        .status(404)
        .json({ message: "Can not find report with this Id" });
    }

    return res.status(200).json({ report });
  } catch (error) {
    return res.status(500).json({
      message: `Error while getting report: ${error.message}`,
    });
  }
};

export const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const report = await ReportModel.deleteOne({ _id: id });

    if (report.deletedCount === 0) {
      return res.status(404).json({ message: "No post found with this ID" });
    }

    return res
      .status(200)
      .json({ message: "Report has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Error while deleting Report: ${error.message}`,
    });
  }
};

export const getAllUser = async (req,res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      users
    })
    
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching users: ${error.message}`,
    });
  }
}