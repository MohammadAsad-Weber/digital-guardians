import { toast } from "react-toastify";
import { instance } from "../instance";

// Utilities & Helper Functions
import { handleToastError } from "@/utilities";
import { queryClient, navigate } from "@/libs";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { UpdateUser } from "@/schemas/user";
import type { BaseResponse } from "@/types/response";

// Updates user profile information and refreshes cached data
const updateUser = async (form: UpdateUser) => {
  // Show a loading notification and store its reference ID
  const toastId = toast.loading("Saving changes");

  try {
    // Send PATCH request to update account details
    const response = await instance.patch<
      BaseResponse,
      AxiosResponse<BaseResponse>,
      UpdateUser
    >("/account/profile", form);

    // Invalidate cached user query to reflect updated data
    queryClient.invalidateQueries({ queryKey: ["user"] });

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

export default updateUser;
