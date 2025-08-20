import axios from "axios";
import { navigate, queryClient } from "@/libs";

// Type Definitions
import type { AccessTokenResponse } from "@/types/response";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

// Assign backend URL from environment variable
const baseURL: string = import.meta.env.VITE_BACKEND_URL;

// Axios instance for standard API requests with JSON content type
export const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
// Axios instance specifically for token refresh
export const refreshInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor: attach Authorization header if access token exists
instance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    const isAuthEndpoint = request.url?.includes("/auth");

    // If not an auth request and token exists, set Authorization header
    if (!isAuthEndpoint && token)
      request.headers.Authorization = `Bearer ${token}`;

    // Return the modified request config
    return request;
  },
  (error) => Promise.reject(error)
);
// Response interceptor: handle 401 by refreshing token and retrying the request
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Cast error config to include optional _retry flag
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // Check for 401 Unauthorized (excluding auth endpoints) and avoid infinite retries
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth")
    ) {
      // Mark request as retried to avoid infinite loops
      originalRequest._retry = true;

      try {
        // Attempt to refresh access token
        const response = await refreshInstance.get<AccessTokenResponse>(
          "/auth/refresh"
        );

        // Store new access token in localStorage
        const accessToken = response.data.access_token;
        localStorage.setItem("access_token", accessToken);

        // Update Authorization header with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry original request with updated token
        return instance(originalRequest);
      } catch {
        // clear client cache and remove token on failure
        queryClient.clear();
        localStorage.removeItem("access_token");

        // redirect user to login page
        setTimeout(() => navigate("/auth/login", { replace: true }), 0);

        return Promise.reject("Your session is invalid or has expired");
      }
    }
    // Reject all other errors without interception
    return Promise.reject(error);
  }
);
