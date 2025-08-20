import { z } from "zod/v4";

// Import reusable schema definition
import { IdentifierSchema } from "../common/index.js";

// Define schema for validating forgot password payload
export const ForgotPasswordSchema = z.object({
  identifier: IdentifierSchema,
});
// Infer TypeScript type from the Forgot Password schema
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
