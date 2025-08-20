import { instance } from "../instance";
import { handleServiceError } from "@/utilities";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { UserResponse } from "@/types/response";

// Retrieves the currently authenticated user's account details
const getUser = async () => {
  try {
    // Send GET request to fetch user account data
    const response = await instance.get<
      UserResponse,
      AxiosResponse<UserResponse>
    >("/account/profile");

    // Return extracted user object from API response
    return response.data.data;
  } catch (error) {
    handleServiceError(error);
  }
};

export default getUser;
