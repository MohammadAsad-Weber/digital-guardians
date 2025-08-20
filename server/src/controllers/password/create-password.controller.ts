import { Password } from "@/models/index.js";
import type { RequestHandler } from "express";
import { createResponse, encrypt } from "@/utilities/index.js";
import type { CreatePassword } from "@/validators/password/index.js";

// Create Password handler – stores a new encrypted password for the authenticated user
const createPassword: RequestHandler<any, any, CreatePassword> = async (
  req,
  res,
  next
) => {
  try {
    // Extract validated fields from the request body
    const { siteURL, username, password } = req.body;

    // Encrypt the plain text password before storage
    const encryptedPassword = encrypt(password);

    // Create a new password record in the database
    await Password.create({
      userRef: req.user.id,
      siteURL,
      username,
      password: encryptedPassword,
    });
    // Return a success response after creation
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: "Password entry has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default createPassword;
