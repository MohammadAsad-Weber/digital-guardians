import axios from "axios";
import BackendError from "./backend-error";
import type { ValidationErrorResponse, BaseResponse } from "@/types/response";

// Centralized error handler for Axios and runtime errors
const handleServiceError = (error: unknown): never => {
  if (axios.isAxiosError<BaseResponse | ValidationErrorResponse>(error)) {
    const { response, request, message, code } = error;

    if (response?.data) {
      const data = response.data as BaseResponse | ValidationErrorResponse;

      // Handle validation errors (presence of "errors" object)
      if ("errors" in data) {
        const firstKey = Object.keys(data.errors)[0];
        throw new BackendError({
          status: data.status,
          status_code: data.status_code,
          message: data.errors[firstKey],
        });
      }
      // Handle standard API error responses
      throw new BackendError(data);
    }
    // Request sent but no response (offline, timeout, DNS issue, etc.)
    if (request && !response) {
      throw new BackendError({
        status: "Network Error",
        status_code: 0,
        message: "Please check your internet connection",
      });
    }
    // Fallback Axios error
    throw new BackendError({
      status: code ?? "Axios Error",
      status_code: response?.status ?? 400,
      message: message ?? "A client-side request error occurred",
    });
  }
  // Non-Axios JavaScript runtime error
  if (error instanceof Error) {
    throw new BackendError({
      status: "Client Runtime Error",
      status_code: 500,
      message: error.message,
    });
  }
  // Absolute fallback
  throw new BackendError({
    status: "Unknown Error",
    status_code: 500,
    message: "An unexpected error occurred",
  });
};

export default handleServiceError;
