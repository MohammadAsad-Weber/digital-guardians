// External Imports
import bcrypt from "bcrypt";

// Model Imports
import { User, RefreshToken } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { Login } from "@/validators/auth/index.js";
import type { AccessTokenResponse } from "@/types/controller";

// Utilities Imports
import {
  createResponse,
  generateAccessToken,
  generateRefreshToken,
} from "@/utilities/index.js";

// Login handler – authenticates user and issues access and refresh tokens
const login: RequestHandler<any, any, Login> = async (req, res, next) => {
  try {
    // Extract identifier (username or email) and password from request body
    const { identifier, password } = req.body;

    // Fetch user by identifier (username or email)
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    // If user not found or password doesn't match, deny access
    if (!user || !(await bcrypt.compare(password, user.password))) {
      createResponse(res).send({
        status: "Forbidden",
        status_code: 403,
        message: "The email or password you entered is incorrect",
      });
      return;
    }
    // Generate JWT access and refresh tokens for authenticated session
    const payload = { id: user.id, username: user.username, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store or update the refresh token in the database
    await RefreshToken.findByIdAndUpdate(
      user._id,
      {
        $set: {
          _id: user._id,
          token: refreshToken,
          createdAt: new Date(),
        },
        $inc: { __v: 1 },
      },
      { upsert: true, runValidators: true, new: true }
    );
    // Send tokens in response with HTTP-only cookie and 200 OK status
    createResponse(res).setToken(refreshToken).send<AccessTokenResponse>({
      status: "OK",
      status_code: 200,
      access_token: accessToken,
      message: "Welcome back! You have logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default login;
