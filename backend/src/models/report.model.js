import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const reportSchema = new Schema(
  {
    colour: {
      type: String,
      required: [true, "colour is required"],
    },
    hardness: {
      type: String,
      required: [true, "hardness is required"],
    },
    Odour: {
      type: String,
      required: [true, "odour is required"],
    },
    phValue: {
      type: String,
      required: [true, "phvalue is required"],
    },
    turbidityNTU: {
      type: String,
      required: [true, "turbidity is required"],
    },
    totalDissolvedSolids: {
      type: String,
      required: [true, "totalDissolvedSolids is required"],
    },
  },
  { timestamps: true }
);

const ReportModel = model("report", reportSchema);

export default ReportModel;
