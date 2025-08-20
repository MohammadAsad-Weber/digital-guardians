import { instance } from "../instance";
import { handleServiceError } from "@/utilities";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { PasswordsResponse } from "@/types/response";

// Retrieves all stored password entries for the authenticated user
const getPasswords = async () => {
  try {
    // Send GET request to fetch list of stored passwords
    const response = await instance.get<
      PasswordsResponse,
      AxiosResponse<PasswordsResponse>
    >("/api/passwords");

    // Return array of password records from API response
    return response.data.data;
  } catch (error) {
    handleServiceError(error);
  }
};

export default getPasswords;
