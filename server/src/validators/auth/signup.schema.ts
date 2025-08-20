import { z } from "zod/v4";

// Import reusable schema definitions
import { UsernameSchema, EmailSchema } from "../common/index.js";

// Define schema for validating signup payload
export const SignupSchema = z.object({
  username: UsernameSchema,

  email: EmailSchema,

  password: z
    .string({ error: "Please enter a valid password" })
    .nonempty({ error: "The password field is required" })
    .regex(/[A-Z]/, {
      error: "The password must contain at least one uppercase letter",
    })
    .regex(/[^A-Za-z0-9]/, {
      error: "The password must contain at least one special character",
    })
    .regex(/[0-9]/, {
      error: "The password must contain at least one number",
    })
    .min(8, { error: "The password must be at least 8 characters in length" }),
});
// Infer TypeScript type from the Signup schema
export type Signup = z.infer<typeof SignupSchema>;
