import { Schema, model } from "mongoose";

const passwordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    siteURL: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Password = model("Password", passwordSchema);
export default Password;
