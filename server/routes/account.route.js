import bcrypt from "bcrypt";
import express from "express";
import authenticateUser from "../middlewares/authenticateUser.js";

// Models
import User from "../models/User.js";
import Password from "../models/Password.js";
import RefreshToken from "../models/RefreshToken.js";

// constant variables
const router = express.Router();
const isProduction = process.env.NODE_ENV === "PRODUCTION";

// Middleware
router.use(authenticateUser);

// GET Request: Get the user's account
router.get("/", async (req, res, next) => {
  try {
    // Get the user from the database
    const user = await User.findById(req.user.id)
      .select("-_id -password -updatedAt -__v")
      .lean();

    // Send a success response
    return res.status(200).json({
      status: "OK",
      status_code: 200,
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// PUT Request: Update the user's account
router.put("/", async (req, res, next) => {
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
    const existingUser = await User.findOne({ _id: { $ne: req.user.id }, $or: [{ username }, { email }]});
    if (existingUser) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "This username or email is already taken",
      });
    }
    // Check if the password is correct
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({
        status: "Forbidden",
        status_code: 403,
        message: "The provided password is invalid",
      });
    }
    // Check if the user is same as before
    if (username === user.username && email === user.email) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Duplicate entry",
      });
    }
    // Update the user in the database
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        username: username,
        email: email,
        updatedAt: new Date(),
      },
      $inc: { __v: 1 },
    });
    // Send a success response
    return res.status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Account updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

// PUT Request: Update the user's password
router.put("/password", async (req, res, next) => {
  try {
    // Destructure the request body
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if the passwords are provided
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide all required fields",
      });
    }
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "New and confirm passwords mismatch",
      });
    }
    // Check if the password is correct
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(403).json({
        status: "Forbidden",
        status_code: 403,
        message: "The provided password is invalid",
      });
    }
    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(confirmPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "New password must be different from the old password",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(confirmPassword, 12);

    // Update the user's password in the database
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        password: hashedPassword,
      },
    });
    // Delete the previous refresh token from the database
    await RefreshToken.findOneAndDelete({ userId: req.user.id });

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
  } catch (error) {
    next(error);
  }
});

// DELETE Request: Delete the user's account
router.delete("/", async (req, res, next) => {
  try {
    // Get the password from the request body
    const password = req.body.password;

    // Check if the password is provided
    if (!password) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide your password",
      });
    }
    // Check if the password is correct
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({
        status: "Forbidden",
        status_code: 403,
        message: "The provided password is invalid",
      });
    }
    // Delete the user, passwords & refresh token from the database
    await User.findByIdAndDelete(req.user.id);
    await Password.deleteMany({ userId: req.user.id });
    await RefreshToken.findOneAndDelete({ userId: req.user.id });

    // Clear the cookie & send a success response
    return res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    }).status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
