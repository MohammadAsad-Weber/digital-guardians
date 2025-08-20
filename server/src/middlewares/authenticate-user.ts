import type { RequestHandler } from "express";
import { verify, createResponse } from "@/utilities/index.js";

// Middleware to verify and authenticate user via JWT token
const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    // Validate Authorization header and ensure Bearer token is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer" + " ")) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Authorization header missing or malformed",
      });
      return;
    }
    // Respond with 401 if the token is not provided
    const token = authHeader.split(" ")[1];
    if (!token) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Authentication is required to proceed",
      });
      return;
    }
    // Validate the token using the configured secret
    const { payload, error } = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      "The ACCESS_TOKEN_SECRET variable is not defined in the .env file"
    );
    // Respond with 401 if the token is invalid or expired
    if (error) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Your session has expired or is invalid",
      });
      return;
    }
    // Attach validated user information to the request object
    req.user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
