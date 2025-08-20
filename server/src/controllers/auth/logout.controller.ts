import type { RequestHandler } from "express";
import { RefreshToken } from "@/models/index.js";
import { createResponse, verify } from "@/utilities/index.js";

// Logout handler – invalidates refresh token and clears the session
const logout: RequestHandler = async (req, res, next) => {
  try {
    // Extract the refresh token from HTTP-only cookies
    const token: string = req.cookies.refresh_token;

    // If token is missing from cookies, deny the request
    if (!token) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Session has expired or is no longer valid",
      });
      return;
    }
    // Verify the refresh token using the configured secret
    const { payload, error } = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      "The REFRESH_TOKEN_SECRET variable is not defined in the .env file"
    );
    // If token is invalid, tampered or expired with, deny the request
    if (error) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Your session has expired or is no longer valid",
      });
      return;
    }
    // Check for token existence in the database
    const storedToken = await RefreshToken.findOne({
      token,
      _id: payload.id,
    });
    // If token not found (possibly revoked), deny the request
    if (!storedToken) {
      createResponse(res).send({
        status: "Unauthorized",
        status_code: 401,
        message: "Your session has expired or is no longer valid",
      });
      return;
    }
    // Delete the refresh token from the database
    await RefreshToken.findByIdAndDelete(payload.id);

    // Clear the refresh token cookie and return success response
    createResponse(res).clearToken().send({
      status: "OK",
      status_code: 200,
      message: "You have been logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default logout;
