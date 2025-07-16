import { useNavigate } from "react-router";
import axios, { AxiosResponse } from "axios";
import type { RefreshResponse } from "@/hooks/types";
import { useQueryClient } from "@tanstack/react-query";

// useAxios Hook Logic
function useAxios() {
  // Hook
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Set default config for global axios instance
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // Interceptor for unauthorized response
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Get the failed request info
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry && !originalRequest.url.includes("/auth")
      ) {
        // Mark this request as already retried
        originalRequest._retry = true;

        try {
          // Refresh the access token
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

          // Update the Authorization header of the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return instance(originalRequest);
        } catch {
          queryClient.clear();
          localStorage.removeItem("access_token");
          setTimeout(() => navigate("/auth/login", { replace: true }), 0);
          return Promise.reject("Your session has expired");
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxios;
