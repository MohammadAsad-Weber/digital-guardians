import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { BaseResponse } from "@/types/response";
import type { UpdatePassword } from "@/schemas/password";

// Updates an existing stored password and refreshes cached data
const updatePassword = async (id: string, form: UpdatePassword) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Saving changes");

  try {
    // Send PATCH request to update password entry
    const response = await instance.patch<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      UpdatePassword
    >(`/api/passwords/${id}`, form);

    // Invalidate cached password list to reflect updated data
    queryClient.invalidateQueries({ queryKey: ["passwords"] });

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Redirect to the updated password's details page after a short delay
    setTimeout(() => navigate(`/vault/${id}`), 1500);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default updatePassword;
