import type { Response } from "express";
import type { CreateResponse } from "@/types/utilities";

// Indicates whether the current environment is production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

// Wraps the Express response object with chainable helpers
const createResponse = (res: Response) => ({
  // Sends a JSON response with status code
  send: <T = Record<string, unknown>>(payload: CreateResponse<T>) => {
    res.status(payload.status_code).json(payload);
    return createResponse(res);
  },
  // Sets the refresh token cookie based on environment
  setToken: (value: string) => {
    res.cookie("refresh_token", value, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });
    return createResponse(res);
  },
  // Clears the refresh token cookie
  clearToken: () => {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    return createResponse(res);
  },
});

export default createResponse;
