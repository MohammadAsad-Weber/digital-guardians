import express from "express";
import mongoose from "mongoose";
import Password from "../models/Password.js";
import { encrypt, decrypt } from "../utilities/encrypt.js";
import authenticateUser from "../middlewares/authenticateUser.js";

// Express Router
const router = express.Router();

// Middleware
router.use(authenticateUser);

// GET Request: Get all the user's passwords
router.get("/", async (req, res, next) => {
  try {
    // Get the user's passwords from the database
    const encryptedPasswords = await Password.find({ userId: req.user.id })
      .select("-userId -updatedAt -__v")
      .sort({ createdAt: -1 })
      .lean();

    // Decrypt the encrypted passwords
    const decryptedPasswords = encryptedPasswords.map(({ encryptedPassword, createdAt, ...rest }) => ({
      ...rest,
      password: decrypt(encryptedPassword),
      createdAt: createdAt,
    }));
    // Send a success response
    return res.status(200).json({
      status: "OK",
      status_code: 200,
      passwords: decryptedPasswords,
    });
  } catch (error) {
    next(error);
  }
});

// GET Request: Get the user's password by id
router.get("/:id", async (req, res, next) => {
  try {
    // Get the value from id parameter
    const id = req.params.id;

    // Check if the id is provided
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Please provide a valid id",
      });
    }
    // Check if the password exists in the database
    const password = await Password.findOne({ _id: id, userId: req.user.id })
      .select("-userId -updatedAt -__v")
      .lean();

    if (!password) {
      return res.status(404).json({
        status: "Not Found",
        status_code: 404,
        message: "The requested password does not exist",
      });
    }
    // Destructure the password object
    const { encryptedPassword, createdAt, ...rest } = password;

    // Decrypt the password
    const decryptedPassword = {
      ...rest,
      password: decrypt(encryptedPassword),
      createdAt: createdAt,
    };
    // Send a success response
    return res.status(200).json({
      status: "OK",
      status_code: 200,
      password: decryptedPassword,
    });
  } catch (error) {
    next(error);
  }
});

// POST Request: Create a new password
router.post("/", async (req, res, next) => {
  try {
    // Destructure the request body
    const { siteURL, username, password } = req.body;

    // Check if the required fields are provided
    if (!siteURL || !username || !password) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide all required fields",
      });
    }
    // Encrypt the password
    const encryptedPassword = encrypt(password);

    // Create a new password in the database
    await Password.create({
      userId: req.user.id,
      siteURL: siteURL,
      username: username,
      encryptedPassword: encryptedPassword,
    });
    // Send a success response
    return res.status(201).json({
      status: "Created",
      status_code: 201,
      message: "Password created successfully",
    });
  } catch (error) {
    next(error);
  }
});

// PUT Request: Update a password
router.put("/:id", async (req, res, next) => {
  try {
    // Destructure the request body and get the value from id parameter
    const id = req.params.id;
    const { siteURL, username, password } = req.body;

    // Check if the id is provided
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Please provide a valid id",
      });
    }
    // Check if the required fields are provided
    if (!siteURL || !username || !password) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Kindly provide all required fields",
      });
    }
    // Check if the password exists in the database
    const existingPassword = await Password.findOne({ _id: id, userId: req.user.id });
    if (!existingPassword) {
      return res.status(404).json({
        status: "Not Found",
        status_code: 404,
        message: "The requested password does not exist",
      });
    }
    // Check if the password is same as before
    if (
      siteURL === existingPassword.siteURL &&
      username === existingPassword.username &&
      password === existingPassword.password
    ) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Duplicate entry",
      });
    }
    // Encrypt the password
    const encryptedPassword = encrypt(password);

    // Update the password in the database
    await Password.findByIdAndUpdate(id, {
      $set: {
        siteURL: siteURL,
        username: username,
        encryptedPassword: encryptedPassword,
        updatedAt: new Date(),
      },
      $inc: { __v: 1 },
    });
    // Send a success response
    return res.status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE Request: Delete a password
router.delete("/:id", async (req, res, next) => {
  try {
    // Get the value from id parameter
    const id = req.params.id;

    // Check if the id is provided
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        status_code: 400,
        message: "Please provide a valid id",
      });
    }
    // Check if the password exists in the database
    const password = await Password.findOne({ _id: id, userId: req.user.id });
    if (!password) {
      return res.status(404).json({
        status: "Not Found",
        status_code: 404,
        message: "The requested password does not exist",
      });
    }
    // Delete the password in the database
    await Password.findByIdAndDelete(id);

    // Send a success response
    return res.status(202).json({
      status: "Accepted",
      status_code: 202,
      message: "Password deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
