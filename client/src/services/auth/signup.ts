import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { navigate } from "@/libs";
import { handleToastError } from "@/utilities";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { Signup } from "@/schemas/auth";
import type { UseFormReset } from "react-hook-form";
import type { BaseResponse } from "@/types/response";

// Handles user signup process and shows appropriate notifications
const signup = async (form: Signup, reset: UseFormReset<Signup>) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Setting up your account");

  try {
    // Send POST request to signup endpoint with form data
    const response = await instance.post<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      Signup
    >("/auth/signup", form);

    // Reset the form fields after successful submission
    reset();

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Delay redirection to login page for a smoother UX
    setTimeout(() => navigate("/auth/login"), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default signup;
