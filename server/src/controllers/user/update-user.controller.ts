// External Imports
import bcrypt from "bcrypt";

// Model Imports
import { User } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { UpdateUser } from "@/validators/user/index.js";

// Utility Imports
import { createResponse, extractChangedFields } from "@/utilities/index.js";

// Update User handler – processes profile updates for the authenticated user
const updateUser: RequestHandler<any, any, UpdateUser> = async (
  req,
  res,
  next
) => {
  try {
    // Fetch user from database and verify the provided password
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      createResponse(res).send({
        status: "Forbidden",
        status_code: 403,
        message: "The password you entered is incorrect",
      });
      return;
    }
    // Determine which fields have been modified
    const changedFields = extractChangedFields<Omit<UpdateUser, "password">>(
      req.body,
      user,
      ["username", "email"]
    );
    // Skip update if no fields were modified or provided
    if (!changedFields) {
      createResponse(res).send({
        status: "OK",
        status_code: 200,
        message: "No changes applied as profile is already up to date",
      });
      return;
    }
    // Construct query conditions to check for username/email conflicts
    const condition = (["username", "email"] as const)
      .map((field) => {
        const value = changedFields[field];
        return value ? { [field]: value } : null;
      })
      .filter((element) => element !== null);

    // Check for existing user with same username/email (excluding self)
    const conflict = await User.findOne(
      condition.length > 1 ? { $or: condition } : condition[0]
    );
    // If a conflicting user is found, return a 409 Conflict response
    if (conflict) {
      createResponse(res).send({
        status: "Conflict",
        status_code: 409,
        message: "Please use a different username or email",
      });
      return;
    }
    // Persist the updates to the database and increment the version
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        ...changedFields,
        updatedAt: new Date(),
      },
      $inc: { __v: 1 },
    });
    // Return success response
    createResponse(res).send({
      status: "OK",
      status_code: 200,
      message: "Profile has been updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
