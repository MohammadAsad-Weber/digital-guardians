import { Password } from "@/models/index.js";
import type { RequestHandler } from "express";
import type { PasswordsResponse } from "@/types/controller";
import { createResponse, decrypt } from "@/utilities/index.js";

// Get Passwords handler – retrieves all password records for the authenticated user
const getPasswords: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all password entries and their count in parallel for performance
    const [passwords, totalPasswords] = await Promise.all([
      Password.find({ userRef: req.user.id })
        .select("-userRef -updatedAt -__v")
        .sort({ createdAt: -1 })
        .lean(),
      Password.countDocuments({ userRef: req.user.id }),
    ]);
    // If no passwords are found, respond with 404
    if (totalPasswords === 0) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "There are currently no passwords available",
      });
      return;
    }
    // Decrypt all retrieved password fields
    passwords.forEach((password) => {
      password.password = decrypt(password.password);
      return password;
    });
    // Return the decrypted password records
    createResponse(res).send<PasswordsResponse>({
      status: "OK",
      status_code: 200,
      data: passwords,
    });
  } catch (error) {
    next(error);
  }
};

export default getPasswords;
