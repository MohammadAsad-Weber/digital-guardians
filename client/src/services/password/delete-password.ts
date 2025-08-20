import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { BaseResponse } from "@/types/response";

// Permanently deletes a stored password and refreshes cached data
const deletePassword = async (id: string) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Removing password permanently");

  try {
    // Send DELETE request to remove password entry by ID
    const response = await instance.delete<
      BaseResponse,
      AxiosResponse<BaseResponse>
    >(`/api/passwords/${id}`);

    // Invalidate cached password list to reflect deletion
    queryClient.invalidateQueries({ queryKey: ["passwords"] });

    // Update loading toast to success state with server response message
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });

    // Redirect back to the vault page immediately
    setTimeout(() => navigate("/vault"), 0);
  } catch (error) {
    handleToastError(toastId, error);
  }
};

export default deletePassword;
