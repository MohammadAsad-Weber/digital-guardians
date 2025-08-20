import express from "express";
import { authLimiter, validate } from "@/middlewares/index.js";

// Validation Schemas
import { ResetTokenParamsSchema } from "@/validators/params/index.js";
import {
  SignupSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/validators/auth/index.js";

// Controllers
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refresh,
  logout,
} from "@/controllers/auth/index.js";

// Initialize Router
const router = express.Router();

/** ROUTES **/

// Register new user
router.post("/signup", authLimiter, validate(SignupSchema), signup);

// User login
router.post("/login", authLimiter, validate(LoginSchema), login);

// Send reset password link
router.post(
  "/forgot-password",
  authLimiter,
  validate(ForgotPasswordSchema),
  forgotPassword
);
// Reset user password
router.patch(
  "/reset-password/:token",
  authLimiter,
  validate(ResetTokenParamsSchema, "params"),
  validate(ResetPasswordSchema),
  resetPassword
);
// Refresh access token
router.get("/refresh", refresh);

// Logout user
router.delete("/logout", logout);

export default router;
