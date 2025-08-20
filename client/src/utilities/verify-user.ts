import { queryClient } from "@/libs";
import { refreshInstance } from "@/services/instance";

// Import Types
import type { AxiosResponse } from "axios";
import type { AccessTokenResponse } from "@/types/response";

// Checks if user is authenticated, refreshing token if necessary
const verify = async () => {
  // Get access token from local storage
  const token = localStorage.getItem("access_token");

  // If token doesn't exist, try refreshing it
  if (!token) {
    try {
      // Request new access token from backend
      const response = await refreshInstance.get<
        AccessTokenResponse,
        AxiosResponse<AccessTokenResponse>
      >("/auth/refresh");

      // Extract refreshed token from response
      const accessToken = response.data.access_token;

      // Store the refreshed token in local storage
      localStorage.setItem("access_token", accessToken);

      // Invalidate all cached queries to refresh data
      queryClient.invalidateQueries();

      // Return authenticated state
      return {
        isLoading: false,
        isAuthenticated: true,
      };
    } catch {
      // Clear all cached queries
      queryClient.clear();

      // Remove token from local storage
      localStorage.removeItem("access_token");

      // Return unauthenticated state
      return {
        isLoading: false,
        isAuthenticated: false,
      };
    }
  }
  // If token does exist, mark user as authenticated
  return {
    isLoading: false,
    isAuthenticated: true,
  };
};

export default verify;
