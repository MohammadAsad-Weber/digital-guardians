import axios from "axios";
import { ErrorResponse } from "@/hooks/types";
import BackendError from "@/utilities/BackendError";

function handleError(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const errorObject = error.response?.data;
    if (errorObject) throw new BackendError(errorObject);
    throw error;
  }
  if (error instanceof Error) throw error;
  throw "An unknown error occurred";
}

export default handleError;
