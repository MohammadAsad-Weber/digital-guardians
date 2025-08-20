// External Imports
import bcrypt from "bcrypt";

// Model Imports
import { User, RefreshToken } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { ChangePassword } from "@/validators/user/index.js";

// Utility Imports
import { createResponse, generateHash } from "@/utilities/index.js";

// Change Password handler – updates the user's password and invalidates existing refresh token
const changePassword: RequestHandler<any, any, ChangePassword> = async (
  req,
  res,
  next
) => {
  try {
    // Extract validated password fields from request body
    const { oldPassword, newPassword } = req.body;

    // Retrieve the user by ID and verify the old password
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "The password you entered is incorrect",
      });
      return;
    }
    // Generate a new hash for the updated password
    const hashedPassword = generateHash(newPassword);

    // Update the password in the database
    await User.findByIdAndUpdate(req.user.id, {
      $set: { password: hashedPassword },
    });
    // Invalidate the user's current refresh token
    await RefreshToken.findByIdAndDelete(req.user.id);

    // Clear the refresh token cookie and return a success message
    createResponse(res).clearToken().send({
      status: "OK",
      status_code: 200,
      message: "Password has been changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default changePassword;
