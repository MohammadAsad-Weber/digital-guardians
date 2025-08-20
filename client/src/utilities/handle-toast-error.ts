import axios from "axios";
import { Id, toast } from "react-toastify";
import type { ValidationErrorResponse, BaseResponse } from "@/types/response";

// Extracts a clean, user-friendly error message from error
const extractErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<BaseResponse>(error)) {
    const { response, request, message } = error;

    // Use validation error field name if present, otherwise generic API message
    if (response?.data) {
      const data = response.data as ValidationErrorResponse | BaseResponse;
      if ("errors" in data) {
        const firstKey = Object.keys(data.errors)[0];
        return data.errors[firstKey];
      }
      return data.message;
    }
    // Request sent but no response (offline, timeout, DNS issue, etc.)
    if (request && !response) return "Please check your internet connection";

    // Fallback to Axios default error message
    return message;
  }
  // Handle standard JavaScript Error objects
  if (error instanceof Error) return error.message;

  // Handle any unexpected or unrecognized error formats
  return "An unexpected error occurred";
};
// Updates an existing toast notification with the extracted error message
const handleToastError = (toastId: Id, error: unknown) => {
  const errorMessage = extractErrorMessage(error);
  toast.update(toastId, {
    render: errorMessage,
    type: "error",
    isLoading: false,
    autoClose: 3000,
    closeOnClick: true,
  });
};

export default handleToastError;
