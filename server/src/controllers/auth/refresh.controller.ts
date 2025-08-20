import type { RequestHandler } from "express";
import { RefreshToken } from "@/models/index.js";
import type { AccessTokenResponse } from "@/types/controller";

// Utility Imports
import {
  verify,
  createResponse,
  generateAccessToken,
  generateRefreshToken,
} from "@/utilities/index.js";

// Refresh Token handler – issues new access and refresh tokens after validation
const refresh: RequestHandler = async (req, res, next) => {
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
    // Construct a new payload from existing identity
    const newPayload = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
    // Generate fresh access and refresh tokens
    const accessToken = generateAccessToken(newPayload);
    const refreshToken = generateRefreshToken(newPayload);

    // Update the stored refresh token with new value
    await RefreshToken.findByIdAndUpdate(payload.id, {
      $set: {
        token: refreshToken,
        createdAt: new Date(),
      },
      $inc: { __v: 1 },
    });
    // Set the new refresh token in HTTP-only cookie and return access token
    createResponse(res).setToken(refreshToken).send<AccessTokenResponse>({
      status: "OK",
      status_code: 200,
      access_token: accessToken,
      message: "You have been logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default refresh;
