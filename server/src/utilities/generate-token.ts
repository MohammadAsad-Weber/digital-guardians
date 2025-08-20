import jwt from "jsonwebtoken";
import type { AuthenticatedUser } from "@/types/global";

// Generates a JWT with provided payload, secret, and expiry
function generateToken(
  payload: AuthenticatedUser,
  secret: jwt.Secret | jwt.PrivateKey | undefined,
  expiresIn: jwt.SignOptions["expiresIn"],
  message: string
) {
  if (!secret) throw new Error(message);
  return jwt.sign(payload, secret, { expiresIn });
}
// Generates a short-lived access token (30 minutes)
export const generateAccessToken = (payload: AuthenticatedUser) => {
  return generateToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    "30m",
    "The ACCESS_TOKEN_SECRET variable is not defined in the .env file"
  );
};
// Generates a long-lived refresh token (7 days)
export const generateRefreshToken = (payload: AuthenticatedUser) => {
  return generateToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    "7d",
    "The REFRESH_TOKEN_SECRET variable is not defined in the .env file"
  );
};
// Generates a short-lived reset token (15 minutes)
export const generateResetToken = (payload: AuthenticatedUser) => {
  return generateToken(
    payload,
    process.env.RESET_TOKEN_SECRET,
    "15m",
    "The RESET_TOKEN_SECRET variable is not defined in the .env file"
  );
};
