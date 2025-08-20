// Model Imports
import { Password } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { PasswordResponse } from "@/types/controller";
import type { IdParams } from "@/validators/params/index.js";

// Utility Imports
import { createResponse, decrypt } from "@/utilities/index.js";

// Get Password handler – retrieves a specific password record for the authenticated user
const getPassword: RequestHandler<IdParams> = async (req, res, next) => {
  try {
    // Fetch the password record belonging to the authenticated user
    const password = await Password.findById({
      _id: req.params.id,
      userRef: req.user.id,
    })
      .select("-userRef -updatedAt -__v")
      .lean();

    // If no matching password is found, return 404 response
    if (!password) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "No record found with the provided Object ID",
      });
      return;
    }
    // Decrypt the stored password before sending the response
    password.password = decrypt(password.password);

    // Return the decrypted password record in the response
    createResponse(res).send<PasswordResponse>({
      status: "OK",
      status_code: 200,
      data: password,
    });
  } catch (error) {
    next(error);
  }
};

export default getPassword;
