// External Imports
import bcrypt from "bcrypt";

// Model Imports
import { User } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { UpdateUser } from "@/validators/user/index.js";

// Utility Imports
import { createResponse } from "@/utilities/index.js";

// Update User handler – processes profile updates for the authenticated user
const updateUser: RequestHandler<any, any, UpdateUser> = async (
  req,
  res,
  next
) => {
  try {
    const fields = ["username", "email"] as const;

    // Fetch user from database and verify the provided password
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "The password you entered is incorrect",
      });
      return;
    }
    // Determine which fields have been modified
    const updatedData = fields.reduce<Record<string, string>>((acc, field) => {
      const value = req.body[field];
      const isValueSame = value === user[field];
      if (value && !isValueSame) acc[field] = value;
      return acc;
    }, {});
    // Skip update if no fields were modified or provided
    if (Object.keys(updatedData).length === 0) {
      createResponse(res).send({
        status: "OK",
        status_code: 200,
        message: "No changes applied as profile is already up to date",
      });
      return;
    }
    // Construct query conditions to check for username/email conflicts
    const condition = fields
      .map((field) => {
        const value = req.body[field];
        return value ? { [field]: value } : null;
      })
      .filter((element) => element !== null);

    // Check for existing user with same username/email (excluding self)
    const conflict = await User.findOne({
      $or: condition,
      _id: { $ne: req.user.id },
    });
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
        ...updatedData,
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
