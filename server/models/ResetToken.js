import { Schema, model } from "mongoose";

const resetTokenSchema = new Schema({
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

// Automatically delete document 15 min (900 seconds) after creation
resetTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 15 });

const ResetToken = model("ResetToken", resetTokenSchema);
export default ResetToken;
