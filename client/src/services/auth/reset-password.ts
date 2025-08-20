import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { UseFormReset } from "react-hook-form";
import type { BaseResponse } from "@/types/response";
import type { ResetPassword } from "@/schemas/auth";

// Handles password reset request, session cleanup, and navigation
const resetPassword = async (
  token: string,
  form: ResetPassword,
  reset: UseFormReset<ResetPassword>
) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Resetting password");

  try {
    // Send PATCH request to reset-password endpoint with token and form data
    const response = await instance.patch<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      ResetPassword
    >(`/auth/reset-password/${token}`, form);

    // Reset the form fields after successful submission
    reset();

    // Remove stored access token from localStorage (logout effect)
    localStorage.removeItem("access_token");

    // Clear all cached queries to remove outdated user data
    queryClient.clear();

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Delay redirection to login page for smoother UX
    setTimeout(() => navigate("/auth/login"), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default resetPassword;
