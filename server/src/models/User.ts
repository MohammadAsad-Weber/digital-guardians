import { Schema, model } from "mongoose";

// Schema for user accounts with authentication credentials
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: [true, "Username must be unique"],
      minLenght: [3, "Username must be at least 3 characters long"],
      maxLength: [50, "Username must not exceed 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      maxLength: [100, "Email must not exceed 100 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
