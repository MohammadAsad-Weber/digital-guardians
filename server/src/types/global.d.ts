// JWT payload structure
export interface Payload {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly iat: number;
  readonly exp: number;
}

// Authenticated user object without token metadata
export type AuthenticatedUser = Omit<Payload, "iat" | "exp">;

// Extends Express's Request interface to include `user` field
declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser;
    }
  }
}
