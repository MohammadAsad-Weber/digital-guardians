// Entity models for stored application data
interface UserData {
  username: string;
  email: string;
  createdAt: Date;
}
interface PasswordData {
  _id: string;
  siteURL: string;
  username: string;
  password: string;
  createdAt: Date;
}

// Core API response contracts
export interface BaseResponse {
  status: string;
  status_code: number;
  message: string;
}

// BaseResponse without the "message" field
type BaseResponseWithoutMessage = Omit<BaseResponse, "message">;

// Validation error response with field-specific error messages
export interface ValidationErrorResponse extends BaseResponseWithoutMessage {
  errors: Record<string, string>;
}

// Authentication response with access token
export interface AccessTokenResponse extends BaseResponse {
  access_token: string;
}

// Response containing user profile data
export interface UserResponse extends BaseResponseWithoutMessage {
  data: UserData;
}

// Responses containing stored password entries
export interface PasswordResponse extends BaseResponseWithoutMessage {
  data: PasswordData;
}
export interface PasswordsResponse extends BaseResponseWithoutMessage {
  data: PasswordData[];
}
