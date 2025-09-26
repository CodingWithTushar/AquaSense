import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const SupportSchema = new Schema({
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subject: {
      type: String,
      required: [true, "subject is required"],
    },
    issue: {
      type: String,
      required: [true, "message is required"],
    },
}, {timestamps:true})

const SupportModel = model("support", SupportSchema);

export default SupportModel;