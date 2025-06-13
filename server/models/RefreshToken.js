import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

// Automatically delete document 7 days (604800 seconds) after creation
refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

const RefreshToken = model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
