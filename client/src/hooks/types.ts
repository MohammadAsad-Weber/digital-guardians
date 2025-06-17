/* INTERFACES */

// Referenced Interfaces
interface User {
  username: string;
  email: string;
  createdAt: string;
}
interface Password {
  _id: string;
  siteURL: string;
  username: string;
  password: string;
  createdAt: string;
}
// Core Interfaces
export interface GeneralResponse {
  status: string;
  status_code: number;
  message: string;
}
export interface SignupBody {
  username: string;
  email: string;
  password: string;
}
export interface LoginBody {
  userId: string;
  password: string;
}
export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface CreatePasswordBody {
  siteURL: string;
  username: string;
  password: string;
}
// Extended Interfaces
export interface LoginResponse extends GeneralResponse {
  access_token: string;
}
export interface UserResponse extends Omit<GeneralResponse, "message"> {
  user: User | null;
}
export interface PasswordsResponse extends Omit<GeneralResponse, "message"> {
  passwords: Array<Password>;
}
export interface PasswordResponse extends Omit<GeneralResponse, "message"> {
  password: Password | null;
}

// Type Alias
export type ErrorResponse = GeneralResponse;
export type RefreshResponse = Omit<LoginResponse, "message">;
export type UpdateUserBody = SignupBody;
export type UpdatePasswordBody = CreatePasswordBody;
