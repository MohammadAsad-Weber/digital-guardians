import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { Login } from "@/schemas/auth";
import type { UseFormReset } from "react-hook-form";
import type { AccessTokenResponse } from "@/types/response";


// Handles user login process, token storage, query cache update, and navigation
const login = async (form: Login, reset: UseFormReset<Login>) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Accessing your account");

  try {
    // Send POST request to login endpoint with form data
    const response = await instance.post<
      AccessTokenResponse,
      AxiosResponse<AccessTokenResponse>,
      Login
    >("/auth/login", form);

    // Reset the form fields after successful submission
    reset();

    // Save the received access token to localStorage
    const accessToken = response.data.access_token;
    localStorage.setItem("access_token", accessToken);

    // Invalidate cached queries to refresh user-related data
    queryClient.invalidateQueries();

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Delay redirection to account page for smoother UX
    setTimeout(() => navigate("/account"), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default login;
