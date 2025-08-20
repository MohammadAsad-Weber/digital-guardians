import { z } from "zod/v4";

// Import reusable schema definitions
import { NewPasswordSchema } from "../common";

// Define schema for validating reset password payload
export const ResetPasswordSchema = z.object({
  newPassword: NewPasswordSchema,
});
// Infer TypeScript type from the Reset Password schema
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
