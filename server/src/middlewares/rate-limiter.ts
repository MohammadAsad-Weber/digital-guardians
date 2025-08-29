import { createResponse } from "@/utilities/index.js";

// Import express-rate-limit and its event handler type definition
import rateLimit, {
  type RateLimitExceededEventHandler,
} from "express-rate-limit";

// Define a custom handler to be invoked when a client exceeds the rate limit
const rateLimitHandler =
  (windowMs: number): RateLimitExceededEventHandler =>
  (req, res) => {
    // Logs IP with Path when rate limit is triggered
    console.warn(`\n[RATE LIMIT EXCEEDED]: Potential brute-force attempt || IP: ${req.ip} || Path: ${req.path}\n`);

    // Sends a structured 429 response
    createResponse(res).send({
      status: "Too Many Requests",
      status_code: 429,
      message: `Too many requests, please wait ${
        windowMs / (60 * 1000)
      } minutes before trying again`,
    });
  };

// Time window in milliseconds
const AuthMs = 15 * 60 * 1000;
const generalMs = 10 * 60 * 1000;

// General rate limiter: restricts to 100 requests
export const generalLimiter = rateLimit({
  windowMs: generalMs,
  limit: 100,
  legacyHeaders: false,
  standardHeaders: "draft-8",
  handler: rateLimitHandler(generalMs),
});
// Authentication-specific rate limiter: restricts to 5 requests
export const authLimiter = rateLimit({
  windowMs: AuthMs,
  limit: 10,
  legacyHeaders: false,
  standardHeaders: "draft-8",
  handler: rateLimitHandler(AuthMs),
});
