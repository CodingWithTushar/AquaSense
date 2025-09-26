import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const HotspotSchema = new Schema(
  {
    areaName: {
      type: String,
      required: [true, "Area name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    disease: {
      type: String,
      required: [true, "Disease name is required"],
      trim: true,
      enum: ["Cholera", "Typhoid", "Diarrhea", "Dengue", "Other"],
    },
    casesReported: {
      type: Number,
      required: [true, "Number of cases is required"],
      min: 0,
    },
    severity: {
      type: String,
      enum: ["Low", "Moderate", "High", "Critical"],
      default: "Low",
    },
    reportedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const HotspotModel = model("Hotspot", HotspotSchema);

export default HotspotModel;
