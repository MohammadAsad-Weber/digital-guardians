// Model Imports
import { User } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { UserResponse } from "@/types/controller";

// Utility Imports
import { createResponse } from "@/utilities/index.js";

// Get User handler – retrieves authenticated user's profile details
const getUser: RequestHandler = async (req, res, next) => {
  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.id)
      .select("-_id -password -updatedAt -__v")
      .lean();

    // If user is not found in the database, invalidate session
    if (!user) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Unable to verify your identity, please log in again",
      });
      return;
    }
    // Respond with the selected user details
    createResponse(res).send<UserResponse>({
      status: "OK",
      status_code: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUser;
