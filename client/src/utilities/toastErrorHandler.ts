import axios from "axios";
import { Id, toast } from "react-toastify";
import { ErrorResponse } from "@/hooks/types";

const handleToastError = (error: unknown, toastId: Id) => {
  let errorMessage = "An unknown error occurred";
  if (axios.isAxiosError<ErrorResponse>(error)) {
    errorMessage = error.response?.data?.message ?? error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  toast.update(toastId, {
    render: errorMessage,
    type: "error",
    isLoading: false,
    autoClose: 3000,
    closeOnClick: true,
  });
};

export default handleToastError;
