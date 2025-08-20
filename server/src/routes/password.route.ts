import express from "express";
import { authenticateUser, validate } from "@/middlewares/index.js";

// Validation Schemas
import { IdParamsSchema } from "@/validators/params/index.js";
import {
  CreatePasswordSchema,
  UpdatePasswordSchema,
} from "@/validators/password/index.js";

// Controllers
import {
  getPassword,
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
} from "@/controllers/password/index.js";

// Initial Router
const router = express.Router();

// Protect all password routes
router.use(authenticateUser);

/** ROUTES **/

// Get specific password
router.get("/:id", validate(IdParamsSchema, "params"), getPassword);

// Get all passwords
router.get("/", getPasswords);

// Create new password
router.post("/", validate(CreatePasswordSchema), createPassword);

// Update password
router.patch(
  "/:id",
  validate(IdParamsSchema, "params"),
  validate(UpdatePasswordSchema),
  updatePassword
);
// Delete password
router.delete("/:id", validate(IdParamsSchema, "params"), deletePassword);

export default router;
