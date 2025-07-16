import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import handleToastError from "@/utilities/toastErrorHandler";

// Types
import type {
  GeneralResponse,
  SignupBody,
  LoginBody,
  LoginResponse,
} from "@/hooks/types";

// useAuth Hook Logic
function useAuth() {
  // Hooks
  const instance = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Functions
  const signup = async (
    form: SignupBody,
    setForm: React.Dispatch<React.SetStateAction<SignupBody>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Setting up your account");

    try {
      // Send request to the backend
      const response = await instance.post<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        SignupBody
      >("/api/auth/signup", form);

      // Clear the form
      setForm({
        username: "",
        email: "",
        password: "",
      });

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const login = async (
    form: LoginBody,
    setForm: React.Dispatch<React.SetStateAction<LoginBody>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Accessing your account");

    try {
      // Send request to the backend
      const response = await instance.post<
        LoginResponse,
        AxiosResponse<LoginResponse>,
        LoginBody
      >("/api/auth/login", form);

      // Clear the form
      setForm({
        userId: "",
        password: "",
      });

      // Update localStorage
      const accessToken = response.data.access_token;
      localStorage.setItem("access_token", accessToken);

      // Invalidate the existing queries
      queryClient.invalidateQueries();

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/account"), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const forgotPassword = async (
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Verifying your identity");

    try {
      // Send request to the backend
      const response = await instance.post<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        { userId: string }
      >("/api/auth/forgot-password", { userId: input });

      // Clear the input field
      setInput("");

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const resetPassword = async (
    token: string,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent default behavior
    event.preventDefault();

    // Show loading toast and capture the ID
    const toastId = toast.loading("Resetting password");

    try {
      // Send request to the backend
      const response = await instance.post<
        GeneralResponse,
        AxiosResponse<GeneralResponse>,
        { newPassword: string }
      >(`/api/auth/reset-password/${token}`, { newPassword: input });

      // Clear the input field
      setInput("");

      // Update localStorage
      localStorage.removeItem("access_token");

      // Clear the cached data
      queryClient.clear();

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/auth/login", { replace: true }), 1500);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };
  const logout = async () => {
    // Show loading toast and capture the ID
    const toastId = toast.loading("Terminating session");

    try {
      // Send request to the backend
      const response = await instance.delete<
        GeneralResponse,
        AxiosResponse<GeneralResponse>
      >("/api/auth/logout");

      // Update localStorage
      localStorage.removeItem("access_token");

      // Clear the cached data
      queryClient.clear();

      // Update the loading toast to success
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      // Redirect
      setTimeout(() => navigate("/auth/login"), 0);
    } catch (error) {
      handleToastError(error, toastId);
    }
  };

  return { signup, login, forgotPassword, resetPassword, logout };
}

export default useAuth;
