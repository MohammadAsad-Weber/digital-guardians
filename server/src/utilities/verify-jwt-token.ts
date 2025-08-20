import jwt from "jsonwebtoken";
import { Payload } from "@/types/global";

// Verifies a JWT and returns either the payload or a formatted error
const verify = (token: string, secret: string | undefined, message: string) => {
  if (!secret) throw new Error(message);
  try {
    const payload = jwt.verify(token, secret) as Payload;
    return { payload, error: null };
  } catch (error) {
    return {
      payload: null,
      error:
        error instanceof jwt.JsonWebTokenError
          ? error
          : error instanceof Error
          ? error
          : new Error("An unknown error occurred during token validation"),
    };
  }
};

export default verify;
