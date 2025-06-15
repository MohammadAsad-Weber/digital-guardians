import rateLimit from "express-rate-limit";

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_req, res) => {
    return res.status(429).json({
      status: "Too many requests",
      status_code: 429,
      message: "You have exceeded the request limit",
    });
  },
});

export default limiter;
