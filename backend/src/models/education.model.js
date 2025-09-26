import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const EducationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    category: {
      type: String,
      enum: ["Water", "Hygiene", "Disease", "General"],
      default: "General",
    },
  },
  { timestamps: true }
);

const EducationModel = model("education", EducationSchema);

export default EducationModel;
