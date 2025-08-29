import { ObjectId } from "mongoose";

// Defines strongly-typed HTTP response structures
type StatusCodeMap = {
  200: "OK";
  201: "Created";
  400: "Bad Request";
  401: "Unauthorized";
  403: "Forbidden";
  404: "Not Found";
  409: "Conflict";
  429: "Too Many Requests";
  500: "Internal Server Error";
};

// Union type representing a standardized HTTP response format
type Response = {
  [Code in keyof StatusCodeMap]: {
    status: StatusCodeMap[Code];
    status_code: Code;
    message?: string;
  };
}[keyof StatusCodeMap];

// Generic HTTP response type extending the base structure with a typed payload
export type CreateResponse<T = Record<string, unknown>> = Response & T;

// Union type representing all supported primitive values, objects, and Date (or null).
export type DataType =
  | null
  | number
  | bigint
  | boolean
  | string
  | object
  | Array
  | Date
  | ObjectId;
