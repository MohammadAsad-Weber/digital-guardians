import { Schema, Types, model } from "mongoose";

// Schema for storing encrypted credentials linked to a specific user
const passwordSchema = new Schema(
  {
    userRef: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "The user reference is required"],
    },
    siteURL: {
      type: String,
      trim: true,
      required: [true, "The site URL is required"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "The username is required"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [50, "Username must not exceed 50 characters"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minLength: [5, "Password must be at least 5 characters long"],
    },
  },
  { timestamps: true }
);

// Compound index for optimized queries by _id and userRef
passwordSchema.index({ _id: 1, userRef: 1 });

const Password = model("Password", passwordSchema);
export default Password;
