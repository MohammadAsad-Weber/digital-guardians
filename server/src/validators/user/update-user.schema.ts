import { z } from "zod/v4";

// Import reusable schema definitions
import {
  EmailSchema,
  UsernameSchema,
  ConfirmPasswordSchema,
} from "../common/index.js";

// Define schema for validating update user payload
export const UpdateUserSchema = z
  .object({
    username: UsernameSchema.optional(),
    email: EmailSchema.optional(),
    password: ConfirmPasswordSchema,
  })
  .refine(({ username, email }) => username || email, {
    error: "You must update at least the username or email",
    path: ["form"],
  });
// Infer TypeScript type from the Update User schema
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
