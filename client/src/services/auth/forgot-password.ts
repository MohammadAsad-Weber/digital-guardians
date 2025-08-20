import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { UseFormReset } from "react-hook-form";
import type { BaseResponse } from "@/types/response";
import type { ForgotPassword } from "@/schemas/auth";

// Handles forgot-password request and provides toast feedback
const forgotPassword = async (
  form: ForgotPassword,
  reset: UseFormReset<ForgotPassword>
) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Verifying your identity");

  try {
    // Send POST request to forgot-password endpoint with form data
    const response = await instance.post<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      ForgotPassword
    >("/auth/forgot-password", form);

    // Reset the input field after successful submission
    reset();

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default forgotPassword;
