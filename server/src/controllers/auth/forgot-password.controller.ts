// Email Imports
import sendMail from "@/email/send-mail.email.js";

// Model Imports
import { User, ResetToken } from "@/models/index.js";

// Type Imports
import type { RequestHandler } from "express";
import type { ForgotPassword } from "@/validators/auth/index.js";

// Utility Imports
import { createResponse, generateResetToken } from "@/utilities/index.js";

// Forgot Password handler – generates and emails a password reset token
const forgotPassword: RequestHandler<any, any, ForgotPassword> = async (
  req,
  res,
  next
) => {
  try {
    // Look up user using username or email from input
    const user = await User.findOne({
      $or: [{ username: req.body.identifier }, { email: req.body.identifier }],
    });
    // If no matching user found, respond with 404 Not Found
    if (!user) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "No account found with the provided email",
      });
      return;
    }
    // Create reset token payload based on user identity
    const payload = { id: user.id, username: user.username, email: user.email };
    const resetToken = generateResetToken(payload);

    // Store the reset token in the database, indexed by user ID
    await ResetToken.findByIdAndUpdate(
      user._id,
      {
        $set: {
          _id: user._id,
          token: resetToken,
          createdAt: new Date(),
        },
        $inc: { __v: 1 },
      },
      { upsert: true, runValidators: true, new: true }
    );
    // Send reset password email with secure link
    sendMail(
      user.email,
      user.username,
      `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`
    );
    // Confirm to client that email has been dispatched
    createResponse(res).send({
      status: "OK",
      status_code: 200,
      message: "A password reset link has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export default forgotPassword;
