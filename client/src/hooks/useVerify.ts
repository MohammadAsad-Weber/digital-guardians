import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import type { RefreshResponse } from "@/hooks/types";
import { useQueryClient } from "@tanstack/react-query";

// useVerify Hook Logic
function useVerify() {
  // Hooks
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Access Token
  const token = localStorage.getItem("access_token");

  // Function to verify user
  const verify = async () => {
    // If token is available then return the response
    if (token) {
      setLoading(false);
      setAuthenticated(true);
      return;
    }
    try {
      // Send request to the backend
      const response = await axios.get<
        RefreshResponse,
        AxiosResponse<RefreshResponse>
      >("/api/auth/refresh", {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true,
      });

      // Update localStorage
      const newAccessToken = response.data.access_token;
      localStorage.setItem("access_token", newAccessToken);

      // Invalidate the existing queries
      queryClient.invalidateQueries();

      // Update authenticated state
      setAuthenticated(true);
      return;
    } catch {
      queryClient.clear();
      setAuthenticated(false);
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
    }
  };

  return { loading, verify, authenticated };
}

export default useVerify;
