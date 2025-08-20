import { z } from "zod/v4";

// Import reusable schema definition
import { ConfirmPasswordSchema } from "../common/index.js";

// Define schema for validating delete user payload
export const DeleteUserSchema = z.object({
  password: ConfirmPasswordSchema,
});
// Infer TypeScript type from the Delete User schema
export type DeleteUser = z.infer<typeof DeleteUserSchema>;
