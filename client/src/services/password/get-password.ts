import { instance } from "../instance";
import { handleServiceError } from "@/utilities";

// Type Definitions
import type { AxiosResponse } from "axios";
import type { PasswordResponse } from "@/types/response";

// Retrieves a stored password entry by its ID
const getPassword = async (id: string) => {
  try {
    // Send GET request to fetch password details by ID
    const response = await instance.get<
      PasswordResponse,
      AxiosResponse<PasswordResponse>
    >(`/api/passwords/${id}`);

    // Return extracted password object from API response
    return response.data.data;
  } catch (error) {
    handleServiceError(error);
  }
};

export default getPassword;
