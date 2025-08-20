import { Schema, Types, model } from "mongoose";

// Schema for storing password reset tokens associated with a user
const resetTokenSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "The user reference is required"],
  },
  token: {
    type: String,
    required: [true, "The reset token is required"],
  },
  createdAt: {
    type: Date,
    expires: 15 * 60,
    required: [true, "Creation date is required"],
  },
});

const ResetToken = model("ResetToken", resetTokenSchema);
export default ResetToken;
