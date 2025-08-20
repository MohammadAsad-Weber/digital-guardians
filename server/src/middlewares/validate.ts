import type { RequestHandler } from "express";
import type { ZodType, ZodObject } from "zod/v4";
import { createResponse } from "@/utilities/index.js";

// Validates request data using a Zod schema from the specified source
const validate =
  (
    schema: ZodObject<{ [key: string]: ZodType }>,
    source: "query" | "params" | "body" = "body"
  ): RequestHandler =>
  (req, res, next) => {
    try {
      // Runs Zod validation using safeParse
      const { success, data, error } = schema.safeParse(req[source]);

      // Handles validation errors by formatting them into key-message pairs
      if (!success) {
        const errors = error.issues.reduce<Record<string, string>>(
          (acc, { path, message }) => {
            acc[path.join(".")] = message;
            return acc;
          },
          {}
        );
        createResponse(res).send<{ errors: Record<string, string> }>({
          status: "Bad Request",
          status_code: 400,
          errors: errors,
        });
        return;
      }
      // Overrides the request source with validated data
      req[source] = data;
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
