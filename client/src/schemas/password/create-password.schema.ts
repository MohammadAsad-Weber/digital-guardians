import { z } from "zod/v4";

// Import reusable schema definition
import { UsernameSchema } from "../common";

// Define schema for validating create password payload
export const CreatePasswordSchema = z.object({
  siteURL: z
    .url({ error: "Please enter a valid URL" })
    .trim()
    .transform((val) => new URL(val).origin),

  username: UsernameSchema,

  password: z
    .string({ error: "Please enter a valid password" })
    .nonempty({ error: "The password field is required" })
    .min(5, { error: "The password must be at least 5 characters in length" }),
});
// Infer TypeScript type from the Create Password schema
export type CreatePassword = z.infer<typeof CreatePasswordSchema>;
