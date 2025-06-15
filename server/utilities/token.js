import jwt from "jsonwebtoken";

// Token Secrets
const ResetTokenSecret = process.env.RESET_TOKEN_SECRET;
const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Function to generate reset token
const generateResetToken = (user) => {
  if (!ResetTokenSecret) throw "Reset Token Secret is missing from the .env file";
  return jwt.sign(user, ResetTokenSecret, { expiresIn: "15m" });
};

// Function to generate access token
const generateAccessToken = (user) => {
  if (!AccessTokenSecret) throw "Access Token Secret is missing from the .env file";
  return jwt.sign(user, AccessTokenSecret, { expiresIn: "30m" });
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  if (!RefreshTokenSecret) throw "Refresh Token Secret is missing from the .env file";
  return jwt.sign(user, RefreshTokenSecret, { expiresIn: "7d" });
};

export { generateResetToken, generateAccessToken, generateRefreshToken };
