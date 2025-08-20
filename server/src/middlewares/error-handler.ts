import { createResponse } from "@/utilities/index.js";
import type { Request, Response, NextFunction } from "express";

// Global error-handling middleware
const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Normalize error object to ensure it's an instance of Error
  const normalized = error instanceof Error ? error : new Error(String(error));

  // Log full stack trace or message for debugging
  const isProduction = process.env.NODE_ENV === "PRODUCTION";
  console.error(`\n[Uncaught Error]: ${normalized.stack ?? normalized.message}\n`);

  // Sends a standardized error response
  createResponse(res).send({
    status: "Internal Server Error",
    status_code: 500,
    message: isProduction
      ? "Something went wrong on our server"
      : normalized.message,
  });
};

export default errorHandler;
