import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { BaseResponse } from "@/types/response";

// Handles user logout, session cleanup, and navigation
const logout = async () => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Terminating session");

  try {
    // Send DELETE request to logout endpoint
    const response = await instance.delete<
      BaseResponse,
      AxiosResponse<BaseResponse>
    >("/auth/logout");

    // Remove stored access token from localStorage
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

    // Redirect to login page immediately after logout
    setTimeout(() => navigate("/auth/login"), 0);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default logout;
