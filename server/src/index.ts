// Load environment variables
import "dotenv/config.js";

// Core & Built-in Middleware
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

// Custom Utilities & Middleware
import { connectDB, createResponse } from "@/utilities/index.js";
import { generalLimiter, errorHandler } from "@/middlewares/index.js";

// Route Modules
import {
  authHandler,
  accountHandler,
  passwordHandler,
} from "@/routes/index.js";

// App Initialization
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB(process.env.DATABASE_URL);

// Trust proxy headers (e.g., for secure cookies behind proxies)
app.set("trust proxy", 1);

// Global Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(generalLimiter);
app.use(cookieParser());
app.use(express.json());

// Register route handlers for defined paths
app.use("/auth", authHandler);
app.use("/account", accountHandler);
app.use("/api/passwords", passwordHandler);

// Fallback route for unhandled endpoints
app.use((req, res) => {
  createResponse(res).send({
    status: "Not Found",
    status_code: 404,
    message: `The URL "${req.originalUrl}" could not be located`,
  });
});
// Centralized Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
