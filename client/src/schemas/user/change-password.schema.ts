import { z } from "zod/v4";

// Import reusable schema definitions
import { NewPasswordSchema } from "../common";

// Define schema for validating change password payload
export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string({ error: "Please enter your current password" })
      .nonempty({ error: "The current password field is required" }),

    newPassword: NewPasswordSchema,

    confirmPassword: z
      .string({ error: "Please confirm your new password" })
      .nonempty({ error: "The confirm password field is required" }),
  })
  .refine(({ oldPassword, newPassword }) => oldPassword !== newPassword, {
    error: "The new password must be different from the current password",
    path: ["newPassword"],
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      error: "The passwords you entered do not match",
      path: ["confirmPassword"],
    }
  );
// Infer TypeScript type from the Change Password schema
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
