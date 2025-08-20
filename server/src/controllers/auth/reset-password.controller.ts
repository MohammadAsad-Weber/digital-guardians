// External Imports
import bcrypt from "bcrypt";

// Type Imports
import type { RequestHandler } from "express";
import type { ResetPassword } from "@/validators/auth/index.js";
import type { ResetTokenParams } from "@/validators/params/index.js";

// Model Imports
import { User, RefreshToken, ResetToken } from "@/models/index.js";

// Utility Imports
import { verify, createResponse, generateHash } from "@/utilities/index.js";

// Reset Password handler – verifies token, resets user password, invalidates sessions
const resetPassword: RequestHandler<
  ResetTokenParams,
  any,
  ResetPassword
> = async (req, res, next) => {
  try {
    // Verify the token from the URL using the secret key
    const { payload, error } = verify(
      req.params.token,
      process.env.RESET_TOKEN_SECRET,
      "The RESET_TOKEN_SECRET variable is not defined in the .env file"
    );
    // If token is invalid or tampered, block the operation
    if (error) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Password reset link is invalid or has expired",
      });
      return;
    }
    // Ensure the reset token exists and matches the one stored in DB
    const storedToken = await ResetToken.findOne({
      _id: payload.id,
      token: req.params.token,
    });
    // If token is missing (e.g. already used, tampered or expired), deny the request
    if (!storedToken) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Password reset link is invalid or has expired",
      });
      return;
    }
    // Fetch user and ensure the new password is not same as the old one
    const user = await User.findById(payload.id);
    if (!user || (await bcrypt.compare(req.body.newPassword, user.password))) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "New password must be different from the current password",
      });
      return;
    }
    // Hash the new password and update it in the database
    const hashedPassword = generateHash(req.body.newPassword);
    await User.findByIdAndUpdate(payload.id, {
      $set: { password: hashedPassword },
    });
    // Invalidate all sessions and reset tokens (security measure)
    await Promise.all([
      RefreshToken.findByIdAndDelete(payload.id),
      ResetToken.findByIdAndDelete(payload.id),
    ]);
    // Clear refresh token cookie and send success message
    createResponse(res).clearToken().send({
      status: "OK",
      status_code: 200,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
