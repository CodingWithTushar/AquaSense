import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    pinCode: {
      type: String,
      required: [true, "Pin code   is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    status:{
        type:String,
        enum: ["admin", "user"],
        default: "user"
    } 
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(7);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  const isPassword = await bcrypt.compare(enteredPassword , this.password)
  return isPassword;
};

const UserModel = model("user", UserSchema);

export default UserModel;
