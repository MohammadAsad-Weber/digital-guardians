import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import type { UseFormReset } from "react-hook-form";

// API & Instance
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { BaseResponse } from "@/types/response";
import type { ChangePassword } from "@/schemas/user";

// Changes the user's password, clears session, and redirects to login
const changePassword = async (
  form: ChangePassword,
  reset: UseFormReset<ChangePassword>
) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Resetting password");

  try {
    // Send PATCH request to change account password
    const response = await instance.patch<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      ChangePassword
    >("/account/password", form);

    // Reset form fields after successful password change
    reset();

    // Remove stored access token to log the user out
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

    // Redirect to login page immediately
    setTimeout(() => navigate("/auth/login"), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default changePassword;
