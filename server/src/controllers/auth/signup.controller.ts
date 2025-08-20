// Model Import
import { User } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { Signup } from "@/validators/auth/index.js";

// Utility Imports
import { createResponse, generateHash } from "@/utilities/index.js";

// Signup handler – registers a new user after validation and hashing
const signup: RequestHandler<any, any, Signup> = async (req, res, next) => {
  try {
    // Extract validated user input from the request body
    const { username, email, password } = req.body;

    // If a conflict is found, return a 409 Conflict response
    if (await User.findOne({ $or: [{ username }, { email }] })) {
      createResponse(res).send({
        status: "Conflict",
        status_code: 409,
        message: "This username or email is already registered",
      });
      return;
    }
    // Hash the user's password before saving it to the database
    const hashedPassword = generateHash(password);

    // Create a new user record in the database
    await User.create({ username, email, password: hashedPassword });

    // Return success response indicating user creation
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: "Account has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default signup;
