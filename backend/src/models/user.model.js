import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    fullName: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
