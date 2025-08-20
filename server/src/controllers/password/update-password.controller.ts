import { Password } from "@/models/index.js";
import { createResponse, encrypt } from "@/utilities/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { IdParams } from "@/validators/params/index.js";
import type { UpdatePassword } from "@/validators/password/index.js";

// Update Password handler – updates specified fields of a password record for the authenticated user
const updatePassword: RequestHandler<IdParams, any, UpdatePassword> = async (
  req,
  res,
  next
) => {
  try {
    // Define the allowed fields eligible for update
    const fields = ["siteURL", "username", "password"] as const;

    // Attempt to retrieve the password record for the authenticated user
    const password = await Password.findById({
      _id: req.params.id,
      userRef: req.user.id,
    });
    // If no record is found or it doesn't belong to the user, return a 404 Bad Request
    if (!password) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "No record found with the provided Object ID",
      });
      return;
    }
    // Build an update object containing only changed fields
    const updatedData: UpdatePassword = fields.reduce<Record<string, string>>(
      (acc, field) => {
        const value = req.body[field];
        const isValueSame = value === password[field];
        if (value && !isValueSame) acc[field] = value;
        return acc;
      },
      {}
    );
    // Skip update if there are no changes detected
    if (Object.keys(updatedData).length === 0) {
      createResponse(res).send({
        status: "OK",
        status_code: 200,
        message: "No changes applied as data is already up to date",
      });
      return;
    }
    // Encrypt the password if it has been modified
    if (updatedData.password)
      updatedData.password = encrypt(updatedData.password);

    // Persist the updated data to the database
    await Password.findByIdAndUpdate(req.params.id, {
      $set: {
        ...updatedData,
        updatedAt: new Date(),
      },
      $inc: { __v: 1 },
    });
    // Send back a success message upon update
    createResponse(res).send({
      status: "OK",
      status_code: 200,
      message: "Password record has been updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
