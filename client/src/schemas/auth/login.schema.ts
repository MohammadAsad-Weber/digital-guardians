import { z } from "zod/v4";

// Import reusable schema definitions
import {
  IdentifierSchema,
  ConfirmPasswordSchema,
} from "../common";

// Define schema for validating login payload
export const LoginSchema = z.object({
  identifier: IdentifierSchema,
  password: ConfirmPasswordSchema,
});
// Infer TypeScript type from the Login schema
export type Login = z.infer<typeof LoginSchema>;
