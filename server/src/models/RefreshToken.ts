import { Schema, Types, model } from "mongoose";

// Schema to store refresh tokens for user session management
const refreshTokenSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "The user reference is required"],
  },
  token: {
    type: String,
    required: [true, "The refresh token is required"],
  },
  createdAt: {
    type: Date,
    expires: 7 * 24 * 60 * 60,
    required: [true, "Creation date is required"],
  },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
