import z from "zod/v4";

export const UsernameSchema = z
  .string({ error: "Please enter a valid username" })
  .trim()
  .nonempty({ error: "The username field is required" })
  .min(3, { error: "The username must contain a minimum of 3 characters" })
  .max(50, { error: "The username must not exceed 50 characters" });

export const EmailSchema = z
  .email({ error: "Please enter a valid email address" })
  .trim()
  .toLowerCase()
  .max(100, { error: "The email address must not exceed 100 characters" });

export const NewPasswordSchema = z
  .string({ error: "Please enter your new password" })
  .nonempty({ error: "The new password field is required" })
  .regex(/[A-Z]/, {
    error: "The password must contain at least one uppercase letter",
  })
  .regex(/[^A-Za-z0-9]/, {
    error: "The password must contain at least one special character",
  })
  .regex(/[0-9]/, {
    error: "The password must contain at least one number",
  })
  .min(8, { error: "The new password must be at least 8 characters long" });

export const IdentifierSchema = z.union([
  z
    .string({ error: "Please enter a valid username" })
    .trim()
    .nonempty({ error: "The username field is required" }),
  z.email({ error: "Please enter a valid email address" }).trim().toLowerCase(),
]);

export const ConfirmPasswordSchema = z
  .string({ error: "Please enter a valid password" })
  .nonempty({ error: "The password field is required" });
