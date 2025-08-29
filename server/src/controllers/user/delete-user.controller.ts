// External Imports
import bcrypt from "bcrypt";

// Utility Imports
import { createResponse } from "@/utilities/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { DeleteUser } from "@/validators/user/index.js";

// Model Imports
import { User, Password, RefreshToken, ResetToken } from "@/models/index.js";

// Delete User handler – permanently deletes the user's account and related records
const deleteUser: RequestHandler<any, any, DeleteUser> = async (
  req,
  res,
  next
) => {
  try {
    // Retrieve user by ID and verify provided password
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      createResponse(res).send({
        status: "Forbidden",
        status_code: 403,
        message: "The password you entered is incorrect",
      });
      return;
    }
    // Delete user and all associated authentication records
    await Promise.all([
      User.findByIdAndDelete(req.user.id),
      Password.deleteMany({ userRef: req.user.id }),
      RefreshToken.findByIdAndDelete(req.user.id),
      ResetToken.findByIdAndDelete(req.user.id),
    ]);
    // Invalidate session by clearing refresh token cookie
    createResponse(res).clearToken().send({
      status: "OK",
      status_code: 200,
      message: "Account has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
