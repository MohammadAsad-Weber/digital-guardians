import { Types } from "mongoose";

/* REUSABLE TYPES */
type UserData = {
  username: string;
  email: string;
  createdAt: Date;
};
type PasswordData = {
  _id: Types.ObjectId;
  siteURL: string;
  username: string;
  password: string;
  createdAt: Date;
};

/* AUTH - Token structure used for access authentication */
export interface AccessTokenResponse {
  access_token: string;
}

/* USER - Response structure for user data */
export interface UserResponse {
  data: UserData;
}

/* PASSWORD - Response structure for password records */
export interface PasswordResponse {
  data: PasswordData;
}
export interface PasswordsResponse {
  data: PasswordData[];
}
