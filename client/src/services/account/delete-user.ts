import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import type { UseFormReset } from "react-hook-form";

// API & Instance
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { DeleteUser } from "@/schemas/user";
import type { BaseResponse } from "@/types/response";

// Permanently deletes a user's account, clears session, and redirects to signup
const deleteUser = async (
  form: DeleteUser,
  reset: UseFormReset<DeleteUser>
) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Permanently removing account");

  try {
    // Send DELETE request to remove account, passing form data in request body
    const response = await instance.delete<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      DeleteUser
    >("/account/profile", { data: form });

    // Reset input fields after account deletion
    reset();

    // Remove stored access token to end the session
    localStorage.removeItem("access_token");

    // Clear all cached queries to remove user-related data
    queryClient.clear();

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Redirect to signup page immediately
    setTimeout(() => navigate("/auth/signup"), 0);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default deleteUser;
