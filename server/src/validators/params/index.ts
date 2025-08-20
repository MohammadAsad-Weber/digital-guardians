import { z } from "zod/v4";
import { Types } from "mongoose";

// Route Parameter Schemas
export const ResetTokenParamsSchema = z.object({
  token: z.jwt({
    error:
      "A valid JWT reset token is required (e.g., eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyJ9.abc123xyz",
  }),
});
export const IdParamsSchema = z.object({
  id: z
    .string({ error: "Please provide a valid Object ID" })
    .refine((val) => Types.ObjectId.isValid(val), {
      error:
        "Expected a 24-character hexadecimal string (e.g., 64d3f5e1c9b3f1a8b2e5d4c3)",
    }),
});
// Types
export type ResetTokenParams = z.infer<typeof ResetTokenParamsSchema>;
export type IdParams = z.infer<typeof IdParamsSchema>;
