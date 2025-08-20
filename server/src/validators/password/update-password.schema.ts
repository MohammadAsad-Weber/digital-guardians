import { z } from "zod/v4";

// Import the schema used for creating a password
import { CreatePasswordSchema } from "./create-password.schema.js";

// Define schema for validating update password payload
export const UpdatePasswordSchema = CreatePasswordSchema.partial().refine(
  ({ siteURL, username, password }) => siteURL || username || password,
  { error: "At least one field must be provided", path: ["form"] }
);
// Infer TypeScript type from the Update Password schema
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
