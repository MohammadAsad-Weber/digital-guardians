import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { UseFormReset } from "react-hook-form";
import type { BaseResponse } from "@/types/response";
import type { CreatePassword } from "@/schemas/password";

// Creates a new stored password and updates the cached list
const createPassword = async (
  form: CreatePassword,
  reset: UseFormReset<CreatePassword>
) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Creating your password");

  try {
    // Send POST request to create new password entry
    const response = await instance.post<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      CreatePassword
    >(`/api/passwords`, form);

    // Reset the form after successful submission
    reset();

    // Invalidate cached password list to trigger a refresh
    queryClient.invalidateQueries({ queryKey: ["passwords"] });

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Redirect to the vault page after a short delay
    setTimeout(() => navigate("/vault"), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default createPassword;
