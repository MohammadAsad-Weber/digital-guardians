import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import resetPasswordTemplate from "../email/templates/reset-password.js";

// Models
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import ResetToken from "../models/ResetToken.js";

// Utility functions
import {
  generateResetToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utilities/token.js";

// constant variables
const router = express.Router();
const ResetTokenSceret = process.env.RESET_TOKEN_SECRET;
const isProduction = process.env.NODE_ENV === "PRODUCTION";
const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// POST Request: Create a new user
router.post("/signup", async (req, res, next) => {
  try {
    // Destructure the request body
    const { username, email, password } = req.body;

    // Check if the details are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide all required fields",
      });
    }
    // Check if the user already exists
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "This username or email already exists",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    // Send a success response
    return res.status(201).json({
      status: "Created",
      status_code: 201,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
});

// POST Request: Login the user
router.post("/login", async (req, res, next) => {
  try {
    // Destructure the request body
    const { userId, password } = req.body;

    // Check if the credentials are provided
    if (!userId || !password) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide your credentials",
      });
    }
    // Check if the user exists and the password matches
    const user = await User.findOne({ $or: [{ username: userId }, { email: userId }] });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "The provided credentials are invalid",
      });
    }
    // Create Access & Refresh token
    const data = { id: user._id, username: user.username, email: user.email };
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    // Store the refresh token in the database
    await RefreshToken.findOneAndUpdate({ userId: user._id },
      {
        $set: {
          userId: user._id,
          token: refreshToken,
          createdAt: new Date(),
        }
      },
      { upsert: true, runValidators: true, new: true }
    );
    // Send the HTTP-only cookie and success response
    return res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    }).status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Logged in successfully",
      access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
});

// POST Request: Forgot password
router.post("/forgot-password", async (req, res, next) => {
  try {
    // Get the username/email from request body
    const userId = req.body.userId;

    // Check if the input is provided
    if (!userId) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide your email or username",
      });
    }
    // Check if the user exists
    const user = await User.findOne({ $or: [{ username: userId }, { email: userId }] });
    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        status_code: 404,
        message: "Kindly provide a valid username or email",
      });
    }
    // Generate a reset token
    const data = { id: user._id, username: user.username, email: user.email };
    const resetToken = generateResetToken(data);

    // Store the reset token in the database
    await ResetToken.findOneAndUpdate({ userId: user._id },
      {
        $set: {
          userId: user._id,
          token: resetToken,
          createdAt: new Date(),
        }
      },
      { upsert: true, runValidators: true, new: true }
    );
    // Reset link
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      to: user.email,
      subject: "Reset Your Password for Digital Guardians",
      html: resetPasswordTemplate({
        username: user.username,
        resetLink: resetLink,
      }),
    });
    // Send a success response
    return res.status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    next(error);
  }
});

// POST Request: Reset the password
router.post("/reset-password/:token", (req, res, next) => {
  try {
    // Get the reset token & new pasword from parameters & request body
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    // Check if the followings are provided
    if (!token || !newPassword) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide password or a valid token",
      });
    }
    // Check if the REFRESH_TOKEN_SECRET is available
    if (!ResetTokenSceret) throw "Reset Token Secret is missing from the .env file";

    // Verify the token
    jwt.verify(token, ResetTokenSceret, async (error, payload) => {
      if (error) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Check if the reset token exists in the database
      const existingToken = await ResetToken.findOne({ userId: payload.id, token });
      if (!existingToken) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Check if the new password is the same as the old password
      const user = User.findById(payload.id);
      if ((await bcrypt.compare(newPassword, user.password))) {
        return res.status(400).json({
          status: "Bad Request",
          status_code: 400,
          message: "New password must be different from the old password",
        });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update the database
      await ResetToken.findOneAndDelete({ userId: payload.id });
      await RefreshToken.findOneAndDelete({ userId: payload.id });
      await User.findByIdAndUpdate(payload.id, {
        $set: { password: hashedPassword },
      });
      // Clear the cookie & send a success response
      return res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      }).status(202).json({
        status: "Accepted",
        status_code: 202,
        message: "Password changed successfully",
      });
    });
  } catch (error) {
    next(error);
  }
});

// GET Request: Refresh the tokens
router.get("/refresh", (req, res, next) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = req.cookies.refresh_token;

    // Check if the refresh token exists
    if (!refresh_token) {
      return res.status(401).json({
        status: "Unauthorized",
        status_code: 401,
        message: "No token found",
      });
    }
    // Check if the REFRESH_TOKEN_SECRET is available
    if (!RefreshTokenSecret) throw "Refresh Token Secret is missing from the .env file";

    // Validate the refresh token
    jwt.verify(refresh_token, RefreshTokenSecret, async (error, payload) => {
      if (error) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Check if the refresh token exists in the database
      const token = await RefreshToken.findOne({  userId: payload.id, token: refresh_token });
      if (!token) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Create Access & Refresh token
      const data = { id: payload.id, username: payload.username, email: payload.email };
      const accessToken = generateAccessToken(data);
      const refreshToken = generateRefreshToken(data);

      // Update the refreshToken in the database
      await RefreshToken.findOneAndUpdate({ userId: payload.id }, {
        $set: {
          token: refreshToken,
          createdAt: new Date(),
        },
      });
      // Send the HTTP-only cookie and success response
      return res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
      }).status(202).json({
        status: "Accepted",
        status_code: 202,
        access_token: accessToken,
      });
    });
  } catch (error) {
    next(error);
  }
});

// DELETE Request: Logout the user
router.delete("/logout", async (req, res, next) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = req.cookies.refresh_token;

    // Check if the refresh token exists
    if (!refresh_token) {
      return res.status(401).json({
        status: "Unauthorized",
        status_code: 401,
        message: "No token found",
      });
    }
    // Check if the REFRESH_TOKEN_SECRET is available
    if (!RefreshTokenSecret) throw "Refresh Token Secret is missing from the .env file";

    // Validate the refresh token
    jwt.verify(refresh_token, RefreshTokenSecret, async (error, payload) => {
      if (error) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Check if the refresh token exists in the database
      const token = await RefreshToken.findOne({ userId: payload.id, token: refresh_token});
      if (!token) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "The provided token is invalid",
        });
      }
      // Delete the refresh token from the database
      await RefreshToken.findOneAndDelete({ userId: payload.id });

      // Clear the cookie & send a success response
      return res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      }).status(202).json({
        status: "Accepted",
        status_code: 202,
        message: "Logged out successfully",
      });
    });
  } catch (error) {
    next(error);
  }
});

export default router;
