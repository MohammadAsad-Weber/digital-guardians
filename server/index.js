import "dotenv/config.js";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./utilities/database.js";

// Middleware
import limiter from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";

// Route handlers
import authRoute from "./routes/auth.route.js";
import accountRoute from "./routes/account.route.js";
import passwordRoute from "./routes/password.route.js";

// constant variables
const app = express();
const port = process.env.PORT ?? 3000;

// Connect to the database
connectDB(process.env.MONGO_URI);

// Enable trust proxy
app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/passwords", passwordRoute);
app.use("/api/account", accountRoute);

// Fallback route for unhandled endpoints
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "Not Found",
    status_code: 404,
    message: `Route ${req.originalUrl} does not exist`,
  });
});

// Error handling middleware
app.use(errorHandler);

// Listening to the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
