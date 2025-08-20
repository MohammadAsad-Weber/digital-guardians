import express from "express";
import { authenticateUser, validate } from "@/middlewares/index.js";

// Validation Schemas
import {
  UpdateUserSchema,
  ChangePasswordSchema,
  DeleteUserSchema,
} from "@/validators/user/index.js";

// Controllers
import {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
} from "@/controllers/user/index.js";

// Initial Router
const router = express.Router();

// Protect all user routes
router.use(authenticateUser);

/** ROUTES **/

// Get current user details
router.get("/profile", getUser);

// Update user profile
router.patch("/profile", validate(UpdateUserSchema), updateUser);

// Change user password
router.patch("/password", validate(ChangePasswordSchema), changePassword);

// Delete user account
router.delete("/profile", validate(DeleteUserSchema), deleteUser);

export default router;
